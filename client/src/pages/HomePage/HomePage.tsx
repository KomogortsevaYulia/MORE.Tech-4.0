import RepeatIcon from "@mui/icons-material/Repeat";
import Timeline from "@mui/lab/Timeline";
import styles from "./HomePage.module.css";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
  timelineItemClasses,
} from "@mui/lab";
import { Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import nft from "../../assets/nft.png";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchActivitiesForHome } from "../../store/ActivitiesSlice/activitiesSlice";
import ActivityItem from "../../components/ActivityItem/ActivityItem";
import React from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchActivitiesForHome());
  }, [dispatch]);

  const { ActivitiesRecords } = useAppSelector((state) => state.activities);
  React.useEffect(() => {
    console.log(ActivitiesRecords);
  }, [ActivitiesRecords]);

  return (
    <>
      <div className={` ${styles.myStyle} `}>
        <div className={`${styles.Ellipse15} `}></div>
        <div className={`${styles.Ellipse16} `}></div>
        <div className={`${styles.Ellipse17} `}></div>
        <div className={`${styles.Ellipse18} `}></div>
        <div className={`${styles.Ellipse19} `}></div>
        <div className={`${styles.Ellipse20} `}></div>
        <div className={`${styles.Ellipse21} `}></div>
        <div className={`position-relative overflow-hidden text-center `}>
          <div className="col-md-5 p-lg-5 mx-auto my-5 ">
            <h1 className="display-4 fw-normal">Крутой проект</h1>
            <p className="lead fw-normal">
              Повысить мотивацию и вовлеченность сотрудников компании для
              формирования дружественной атмосферы, а так-же профессионального
              роста за счет дополнительной мотивации участия в образовательных и
              общественных мероприятиях.
            </p>
          </div>
        </div>

        <div
          className={`position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center `}
        >
          <div className="col-md-6 p-lg-6 mx-auto my-6 ">
            <h2 className="display-4 fw-normal">Механика</h2>
            <p className="lead fw-normal">
              В системе существуют монеты и NFT, будь активным и они у тебя
              появятся!
            </p>
          </div>
          <div className="row d-flex justify-content-center">
            <div className=" col-5 p-1 m-1">
              <div className="h-100 p-1 bg-light border rounded-3">
                <Timeline
                  sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                >
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary">
                        <MenuBookIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Образование
                      </Typography>
                      <Typography>
                        Менторинг, прохождение обязательных курсов, митапы,
                        фокус-группы, исследования
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary">
                        <Diversity3Icon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Командное взаимодействие
                      </Typography>
                      <Typography>
                        Начисления от руководителя в рамках командного
                        взаимодействия{" "}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary" variant="outlined">
                        <CelebrationIcon />
                      </TimelineDot>
                      <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Соревнования
                      </Typography>
                      <Typography>
                        Битвы (соревнования/конкурсы/рейтинги) – мероприятия с
                        одним победителем, который определяется жюри или общим
                        голосованием.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineSeparator>
                      <TimelineConnector sx={{ bgcolor: "secondary.main" }} />
                      <TimelineDot color="secondary">
                        <RepeatIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Челленджи
                      </Typography>
                      <Typography>
                        испытание, в котором пользователь делает ставку монетами
                        «Digital Ruble» и выбираеn задание. Если задание
                        выполнено он получает монеты, иначе теряет.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </div>
            </div>

            <div className=" col-3 col-md-2 p-1 m-1 align-items-center ">
              <div className="h-100 p-1 bg-light border rounded-3 ">
                <div className="d-flex justify-content-center">
                  <div className={`${styles.coin} `}>
                    <div className={`${styles.side} ${styles.head}`}>DR</div>
                    <div className={`${styles.side} ${styles.tail}`}>DR</div>
                    <div className={`${styles.edge}`}></div>
                  </div>
                </div>
                <h2 className="fw-normal">Digital Ruble</h2>
                <p>Собственная цифровая валюта (монеты)</p>
              </div>
            </div>

            <div className=" col-3 col-md-2 p-1 m-1">
              <div className="h-100 p-1 bg-light border rounded-3">
                <img
                  src={nft}
                  className={`img-fluid ${styles.nftImage}`}
                  alt="..."
                />
                <h2 className="fw-normal">NFT сертификат</h2>
                <p>
                  Уникальные виртуальные объекты с возможностью обменять на
                  реальные
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center `}
        >
          <div className="col-md-6 p-lg-6 mx-auto my-6 ">
            <h2 className="display-4 fw-normal">Предстоящие активности</h2>
          </div>
          <div className={styles.content}>
            <div>
              <div className={styles.activities}>
                {ActivitiesRecords &&
                  ActivitiesRecords?.map((row) => <ActivityItem row={row} />)}
              </div>
            </div>
          </div>

        </div>


      </div>
    </>
  );
};

export default HomePage;
