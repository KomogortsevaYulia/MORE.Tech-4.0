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

interface IActivityItemProps {
  row: IActivities;
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

const ActivityItem: React.FC<IActivityItemProps> = ({ row }) => {
  // const { user, fethcUserStatus } = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();


  const [open, setOpen] = React.useState(false);
  const [currentActivity, setCurrentActivity] = React.useState(row);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={styles.activity}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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

          {currentActivity?.typeId === 2 ? (
            <div className="d-flex flex-row ">
              <TextField
                id="standard-number"
                label="Ставка на челлендж"
                type="number"
                className="me-4"
                variant="standard"
              />
              <Button
                className={styles.enrollButton}
                variant="contained"
                onClick={(e) => {
                  handleClose();
                  console.log(row);
                  e.stopPropagation();
                }}
              >
                Сделать ставку!
              </Button>
            </div>
          ) : (
            null
          )}
        </Box>
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
                </div>
                <Typography sx={{ color: "var(--purple)" }}>
                  c {row.dateStart} до {row.dateEnd}
                </Typography>
              </div>
              <div className={styles.activityButtons}>
                <Tooltip title="Записаться на мероприятие">
                  <Button
                    // sx={{ background: "var(--green)" }}
                    className={styles.enrollButton}
                    variant="contained"
                    onClick={(e) => {
                      handleOpen();
                      setCurrentActivity(row);
                      e.stopPropagation();
                    }}
                  >
                    Записаться
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.details}>
            <div className={styles.flexColumn}>
              <Typography sx={{ color: "text.secondary" }}>Описание</Typography>
              <Typography>{row.description}</Typography>
            </div>
            <div className={styles.members}>
              <div className={styles.flexColumn}></div>
            </div>
            <div className={styles.allMembers}>
              <AvatarGroup max={row.users.length}>
                {row.users.map((user) => (
                  <Tooltip title={user.user.FIO}>
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ActivityItem;
