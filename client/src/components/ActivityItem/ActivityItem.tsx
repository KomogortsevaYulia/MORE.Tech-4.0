import {
  AccordionSummary,
  Typography,
  Tooltip,
  Button,
  AccordionDetails,
  AvatarGroup,
  Avatar,
  Chip,
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
  return (
    <div className={styles.activity}>
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
                  <Avatar
                    alt={user.user.FIO}
                    src={user.user.image}
                    className={styles.memberAvatar}
                  />
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
