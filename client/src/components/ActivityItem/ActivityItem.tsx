import {
  AccordionSummary,
  Typography,
  Tooltip,
  Button,
  AccordionDetails,
  AvatarGroup,
  Avatar,
  Chip,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { IActivities, IUser } from "../../api/mainApi";
import { styled } from "@mui/material/styles";

import styles from "./ActivityItem.module.css";
import { typeActivity } from "../../const/activityTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  createActivityRecord,
  patchCompletedActivities,
  patchWinnerActivities,
} from "../../store/ActivitiesSlice/activitiesSlice";
import {
  transferNft,
  transferRubles,
} from "../../store/transactionsSlice/transactionsSlice";

import { SelectChangeEvent } from "@mui/material/Select";
import { removeNftFromBalance } from "../../store/userSlice/userSlice";

enum UserRoles {
  ADMIN = 1,
  HR = 2,
  RUKOVOD = 3,
  SOTRUDNIK = 4,
}

enum TypeActivityID {
  SOREV = 1,
  CHALENG = 2,
  OBUCH = 3,
  KOMAND = 4,
}

interface IActivityItemProps {
  row: IActivities;
  withoutButton: boolean;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const ActivityItem: React.FC<IActivityItemProps> = ({ row, withoutButton }) => {
  const { user } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const userId = row.users.findIndex((item) => item.userId === user?.id);
  //Уже записан на мероприятие
  const isRec = userId !== -1 ? true : false;

  //Если пользователь выйграл
  const userIsWin = isRec ? (row.users[userId].isWin ? true : false) : false;

  const wineerUser =
    row.users[row.users.findIndex((item) => item.isWin === true)];

  const [winSorevUser, setWinSorevUser] = React.useState(0);

  const bet = row.users.find((u) => u.userId === user!.id)?.bet;

  const [currentActivity, setCurrentActivity] = React.useState(row);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEnd, setOpenEnd] = React.useState(false);

  const handleOpenEnd = () => setOpenEnd(true);
  const handleCloseEnd = () => setOpenEnd(false);

  const [rublesAmount, setRublesAmount] = React.useState<number | string>("");
  const handleRublesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRublesAmount(+event.target.value);
  };

  const handleChangeWinSorevUser = (event: SelectChangeEvent<number>) => {
    setWinSorevUser(Number(event.target.value));
  };

  const handleEnrollClick = (e: any) => {
    e.stopPropagation();
    dispatch(
      createActivityRecord({
        activitiesId: row.id,
        userId: user!.id,
        bet: +rublesAmount,
      })
    );
    dispatch(
      transferRubles({
        amount: +rublesAmount,
        fromPrivateKey: user!.privateKey,
        why: "Взнос на участие в челендже",
        userId: user!.id,
        toId: users!.find((u) => u.roleId === 1)!.id,
        toPublicKey: users!.find((u) => u.roleId === 1)!.publicKey,
      })
    );
    handleClose();
  };

  const handleTransferSorev = () => {
    const winUser = row.users.find(
      (item) => item.userId === winSorevUser
    )?.user;
    if (currentActivity.rewardType === 1) {
      dispatch(
        transferRubles({
          amount: +currentActivity.rewardValue,
          userId: user!.id,
          toId: winUser!.id,
          fromPrivateKey: user!.privateKey,
          toPublicKey: winUser!.publicKey,
          why: "За победу в " + currentActivity.title,
        })
      );
    } else if (currentActivity.rewardType === 2) {
      const nft = user!.balanceNFT.balance.find(
        (nft) => nft.uri === currentActivity.rewardValue
      )!;
      dispatch(
        transferNft({
          fromPrivateKey: user!.privateKey,
          toPublicKey: winUser!.publicKey,
          nft,
          toId: winUser!.id,
          userId: user!.id,
          why: "За победу в " + currentActivity.title,
        })
      );
      dispatch(removeNftFromBalance(nft.uri));
    }
    dispatch(patchCompletedActivities(currentActivity.id));
    dispatch(
      patchWinnerActivities(
        currentActivity!.users!.find((item) => item.userId === winUser!.id)!.id
      )
    );
    handleCloseEnd();
  };

  const handleTransfer = () => {
    currentActivity.users.forEach((userTo) => {
      if (currentActivity.rewardType === 1) {
        dispatch(
          transferRubles({
            amount: +currentActivity.rewardValue,
            userId: user!.id,
            toId: userTo.userId,
            fromPrivateKey: user!.privateKey,
            toPublicKey: userTo!.user.publicKey,
            why:
              currentActivity.typeId === 3
                ? "За обучение " + currentActivity.title
                : currentActivity.typeId === 4
                ? "За командное взаимодействие " + currentActivity.title
                : "'",
          })
        );
      } else if (currentActivity.rewardType === 2) {
        const nft = user!.balanceNFT.balance.find(
          (nft) => nft.uri === currentActivity.rewardValue
        )!;
        dispatch(
          transferNft({
            fromPrivateKey: user!.privateKey,

            toPublicKey: userTo!.user.publicKey,
            nft,
            toId: userTo!.userId,
            userId: user!.id,
            why:
              currentActivity.typeId === 3
                ? "За обучение " + currentActivity.title
                : currentActivity.typeId === 4
                ? "За командное взаимодействие " + currentActivity.title
                : "'",
          })
        );
        dispatch(removeNftFromBalance(nft.uri));
      }
    });
    dispatch(patchCompletedActivities(currentActivity.id));
    handleCloseEnd();
  };

  const canFinish =
    user &&
    ((user?.roleId === UserRoles.ADMIN &&
      row.typeId === TypeActivityID.CHALENG) ||
      (user?.roleId === UserRoles.ADMIN &&
        row.typeId === TypeActivityID.SOREV) ||
      (user?.roleId === UserRoles.HR && row.typeId === TypeActivityID.OBUCH) ||
      (user?.roleId === UserRoles.ADMIN &&
        row.typeId === TypeActivityID.KOMAND));

  return (
    <div className={styles.activity}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 450,
              bgcolor: "background.paper",
              borderRadius: 5,
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography variant="h5">
              Запись на мероприятие {row.title}
            </Typography>
            <Typography variant="h6">
              Баланс:{" "}
              {user!.balance?.coinsAmount.toLocaleString() ||
                "Баланс загружается..."}
            </Typography>
            {currentActivity?.typeId === 2 ? (
              <div className="d-flex flex-row ">
                <TextField
                  id="standard-number"
                  label="Ставка на челлендж"
                  type="number"
                  className="me-4"
                  variant="standard"
                  value={rublesAmount}
                  onChange={handleRublesChange}
                />
                <Button
                  className={styles.enrollButton}
                  variant="contained"
                  onClick={handleEnrollClick}
                >
                  Сделать ставку!
                </Button>
              </div>
            ) : null}
          </Box>
        </>
      </Modal>

      <Modal
        open={openEnd}
        onClose={handleCloseEnd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "min-content",
              bgcolor: "background.paper",
              borderRadius: 5,
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography variant="body1">{row.title}</Typography>
            <Typography variant="h6">
              Баланс:{" "}
              {user!.balance?.coinsAmount.toLocaleString() ||
                "Баланс загружается..."}
            </Typography>
            {currentActivity?.typeId === 1 ? (
              <div className="">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={winSorevUser}
                  label="Выбор челов"
                  className="w-100 mb-2"
                  onChange={handleChangeWinSorevUser}
                >
                  {row.users &&
                    row.users?.map((row) => (
                      <MenuItem value={row.userId}>{row.user.FIO}</MenuItem>
                    ))}
                </Select>

                <Button
                  className={styles.enrollButton}
                  variant="contained"
                  onClick={handleTransferSorev}
                >
                  Начислить и завершить!
                </Button>
            </div>
            ) : null}
            {currentActivity?.typeId === 2 ||
            currentActivity?.typeId === 3 ||
            currentActivity?.typeId === 4 ? (
              <div className="d-flex flex-row ">
                <Button
                  className={styles.enrollButton}
                  variant="contained"
                  onClick={handleTransfer}
                >
                  Начислить и завершить!
                </Button>
              </div>
            ) : null}
          </Box>
        </>
      </Modal>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={styles.header}>
            <div className={styles.meta}>
              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {userIsWin && withoutButton ? (
                    <Chip
                      label="Победа"
                      style={{
                        background: "var(--purple)",
                      }}
                    />
                  ) : null}
                  {row.completed ? (
                    <div className="m-0 p-0 d-flex flex-row align-items-center">
                      <Chip
                        label="Окончено"
                        className="me-2"
                        style={{
                          background: "var(--red)",
                        }}
                      />
                      <Typography>
                        <s>{row.title}</s>
                      </Typography>
                    </div>
                  ) : (
                    <Typography>{row.title}</Typography>
                  )}

                  <Chip
                    label={typeActivity[row.typeId].title}
                    style={{
                      background: typeActivity[row.typeId].color as string,
                    }}
                  />
                  {currentActivity?.typeId === 2 && !bet ? (
                    <Chip
                      label={`Ставка определяется вами`}
                      style={{
                        background: "var(--green)",
                      }}
                    />
                  ) : currentActivity?.typeId === 2 && bet ? (
                    <Chip
                      label={`Ваша ставка: ${bet}`}
                      style={{
                        background: "var(--green)",
                      }}
                    />
                  ) : currentActivity.rewardType === 2 ? (
                    <Chip
                      label={`Награда: NFT`}
                      style={{
                        background: "var(--green)",
                      }}
                    />
                  ) : (
                    <Chip
                      label={`Награда: ${currentActivity.rewardValue} ${
                        currentActivity.rewardType === 1
                          ? "Digital Rubles"
                          : " "
                      }`}
                      style={{
                        background: "var(--green)",
                      }}
                    />
                  )}
                </div>
                <Typography sx={{ color: "var(--purple)" }}>
                  c {row.dateStart} до {row.dateEnd}
                </Typography>
              </div>
              <div className={styles.activityButtons}>
                {withoutButton || row.completed ? null : (
                  <div>
                    {canFinish || user?.roleId === 1 ? (
                      <Tooltip title="Завершить активность">
                        <Button
                          style={{
                            background: "rgb(221, 76, 76)",
                            margin: "0 10px",
                          }}
                          variant="contained"
                          onClick={(e) => {
                            handleOpenEnd();
                            setCurrentActivity(row);
                            e.stopPropagation();
                          }}
                        >
                          Завершить
                        </Button>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Записаться на мероприятие">
                        <Button
                          disabled={isRec}
                          className={styles.enrollButton}
                          variant="contained"
                          onClick={(e) => {
                            handleOpen();
                            setCurrentActivity(row);
                            e.stopPropagation();
                          }}
                        >
                          {isRec ? "Вы уже записаны" : "Записаться"}
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div
            className={`${styles.details} d-flex flex-row justify-content-between`}
          >
            <div className={`${styles.flexColumn} `}>
              <Typography sx={{ color: "text.secondary" }}>Описание</Typography>
              <Typography>{row.description}</Typography>
            </div>

            {row.typeId === 1 && wineerUser ? (
              <div className={styles.flexColumn}>
                <Typography sx={{ color: "text.secondary" }}>
                  Победитель
                </Typography>
                <Tooltip title={`${wineerUser?.user.FIO}`}>
                  <Avatar
                    alt={`${wineerUser?.user.FIO}`}
                    src={`${wineerUser?.user.image}`}
                  />
                </Tooltip>
              </div>
            ) : null}

            {row.rewardValue ? (
              <div className={`${styles.flexColumn} mx-auto`}>
                <Typography sx={{ color: "text.secondary " }}>
                  Награда
                </Typography>
                {row.rewardType === 1 ? (
                  <Typography className="fw-bold mx-auto">
                    {row.rewardValue} Digital Rubles
                  </Typography>
                ) : null}

                {row.rewardType === 2 ? (
                  <Tooltip title="NFT">
                    <Avatar alt="NFT" src={`${row.rewardValue}`} />
                  </Tooltip>
                ) : null}
                {row.rewardType === 3 ? (
                  <Typography className="fw-bold">{row.rewardValue}</Typography>
                ) : null}
              </div>
            ) : null}

            {row.users.length !== 0 ? (
              <div>
                <Typography sx={{ color: "text.secondary" }}>
                  Участники
                </Typography>
                <div className={styles.allMembers}>
                  <AvatarGroup max={row.users.length}>
                    {row.users.map((user) => (
                      <Tooltip key={user.id} title={user.user.FIO}>
                        <Avatar
                          alt={user.user.FIO}
                          src={user.user.image}
                          className={styles.memberAvatar}
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                </div>
              </div>
            ) : null}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ActivityItem;
