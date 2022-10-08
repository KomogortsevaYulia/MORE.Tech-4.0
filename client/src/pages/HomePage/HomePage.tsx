import React from "react";
import Timeline from '@mui/lab/Timeline';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Item>
          <Typography variant="h5" component="h5">
            Достижения
          </Typography>

          Достижения – какие либо достижения в рабочей области, в рамках коммандного взаимодействия,мероприятиях от компании и тд.
          Прохождение обучений – успешное окончание курса, назнаяенного компанией, или согласовонного с ней
          Благодарности – персональные благодарности от коллег, начальства
          Челлендж - испытание, в котором пользователь делает ставку монетами «Digital Ruble» и выбираеn задание. Если задание выполнено он получает монеты, иначе теряет.
          Битвы (соревнования/конкурсы/рейтинги) – мероприятия с одним победителем, который определяется жюри или общим голосованием.
          Ачивки - достижения, связанные с прогрессом.
          Администратор ежемесячн
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <Typography variant="h5" component="h5">
            Цель
          </Typography>
          повысить мотивацию и вовлеченность в комьюнити компании для формирования дружественной атмосферы и профессионального роста. Помимо материальной мотивации, используется спортивный интерес
        </Item>
      </Grid>
      <Grid item xs={4}>
        <Item>
          <Typography variant="h5" component="h5">
            Мотивация
          </Typography>
          Повысить мотивацию и вовлеченность сотрудников компании для формирования дружественной атмосферы, а так-же профессионального роста за счет дополнительной мотивации участия в образовательных и общественных мероприятиях
        </Item>
      </Grid>
      <Grid item xs={8}>
        <Item>
          <Typography variant="h5" component="h5">
            Ачивки
          </Typography>

          Количество дней без опоздания (10, 30, 90, 270 и тд)
          Победы в челленждах
          Стрики в челленждах
          Победы в битвах
          Покупка мерча
          Прохождение обучений

        </Item>
      </Grid>
    </Grid>);
};

export default HomePage;
