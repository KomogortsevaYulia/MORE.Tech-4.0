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
} from "@mui/material";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { IActivities } from "../../api/mainApi";
import { styled } from "@mui/material/styles";

import styles from "./ActivityItem.module.css";
import { typeActivity } from "../../const/activityTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createActivityRecord } from "../../store/ActivitiesSlice/activitiesSlice";
import { transferRubles } from "../../store/transactionsSlice/transactionsSlice";
import {activitiesCurrency} from "../../const/activitiesCurrency"

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
  const { user, fethcUserStatus } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  const isRec =
    row.users.findIndex((item) => item.userId === user?.id) !== -1
      ? true
      : false;

  const bet = row.users.find((u) => u.userId === user!.id)?.bet;

  const [activitiesCurrencyValue, setActivitiesCurrency] = React.useState(activitiesCurrency);
  const [currentActivity, setCurrentActivity] = React.useState(row);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rublesAmount, setRublesAmount] = React.useState<number | string>("");
  const handleRublesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRublesAmount(+event.target.value);
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
                  <Typography>{row.title}</Typography>
                  <Chip
                    label={typeActivity[row.typeId].title}
                    style={{
                      background: typeActivity[row.typeId].color as string,
                    }}
                  />
                  {bet && (
                    <Chip
                      label={`Ваша ставка: ${bet}`}
                      style={{
                        background: "var(--red: #F08182)",
                      }}
                    />
                  )}
                </div>
                <Typography sx={{ color: "var(--purple)" }}>
                  c {row.dateStart} до {row.dateEnd}
                </Typography>
              </div>
              <div className={styles.activityButtons}>

                {withoutButton ? 
                  null
                :
                  <div>
                    {user?.roleId === 1 ? 
                      <Tooltip title="Завершить активность">
                        <Button
                          style={{background: "rgb(221, 76, 76)", margin: "0 10px"}}
                          variant="contained"
                          onClick={(e) => {
                            handleOpen();
                            setCurrentActivity(row);
                            e.stopPropagation();
                          }}
                        >
                          Завершить 
                        </Button>
                      </Tooltip>
                    :
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
                          {isRec ? "Вы уже записаны": "Записаться"}
                        </Button>
                      </Tooltip>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={`${styles.details} d-flex flex-row justify-content-between`}>
            <div className={`${styles.flexColumn} `}>
              <Typography sx={{ color: "text.secondary" }}>Описание</Typography>
              <Typography>{row.description}</Typography>
            </div>
            {row.rewardValue ? 
              <div className={styles.flexColumn}>
                <Typography sx={{ color: "text.secondary" }}>Награда</Typography>
                {row.rewardType === 1 ?
                  <Typography className="fw-bold">{row.rewardValue} Digital Rubles</Typography>
                : null }

                {row.rewardType === 2 ?
                  <Tooltip title="NFT">
                    <Avatar
                      alt="NFT"
                      src={`${row.rewardValue}`}
                    />
                  </Tooltip>
                : null }
                {row.rewardType === 3 ?
                  <Typography className="fw-bold">{row.rewardValue}</Typography>
                : null }
              </div>
            :null}

            {row.users.length !== 0 ? 
              <div >
                <Typography sx={{ color: "text.secondary" }}>Участники</Typography>
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
             :null}

          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ActivityItem;
