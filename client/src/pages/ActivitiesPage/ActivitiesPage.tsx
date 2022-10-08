import React, { useCallback } from "react";
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchActivities } from "../../store/ActivitiesSlice/activitiesSlice";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { Divider, Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import Button from '@mui/material/Button';
import styles from './ActivitiesPage.module.css'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const ActivitiesPage = () => {



  const { user, fethcUserStatus } = useAppSelector((state) => state.user);

  React.useEffect(() => { }, [user]);


  const dispatch = useAppDispatch();
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  const { Activities } = useAppSelector((state) => state.activities);
  React.useEffect(() => {

  }, [Activities]);

  React.useEffect(() => {
    dispatch(fetchActivities());
  }, []);

  const [value11, setValue11] = React.useState<Date | null>(null);
  const [value2, setValue2] = React.useState<Date | null>(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddActivity = useCallback(() => {

  }, [])
  return <div>
    <header className={styles.filters}>
      <Button variant="contained" onClick={handleOpen}>Создать активность</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 5,
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Добавление активности
          </Typography>
          <TextField label="Название активности" variant="outlined" />
          <TextField label="Описание активности" variant="outlined" />

          <Button onClick={handleAddActivity} variant="contained">Добавить</Button>
          <Button onClick={handleClose}>Отмена</Button>

        </Box>
      </Modal>
      <Stack spacing={2} direction="row">
        <div className={styles.filtersItem}>
          <Typography sx={{ color: 'text.secondary' }}>Название</Typography>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={Activities && Activities?.map((option) => option.title) || []}
            renderInput={(params) => <TextField {...params} />}
            sx={{ width: 300 }}
          />
        </div>
        <div className={styles.filtersItem}>

          <Typography sx={{ color: 'text.secondary' }}>Даты начала до</Typography>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Даты начала до"
              value={value11}
              onChange={(newValue) => {
                setValue11(newValue);
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className={styles.filtersItem}>
          <Typography sx={{ color: 'text.secondary' }}>Даты начала после</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Даты начала после"
              value={value2}
              onChange={(newValue) => {
                setValue2(newValue);
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />


          </LocalizationProvider>
        </div>
        <div className={styles.filtersItem}>
          <Typography sx={{ color: 'text.secondary' }}>Применить фильтры</Typography>
          <Tooltip title="Применить фильтры">
            <Button variant="contained">Применить</Button>

          </Tooltip>
        </div>

      </Stack>

    </header>
    <div className={styles.content}>

      <div>
        <Typography sx={{ color: 'text.secondary' }}>Примененные фильтры</Typography>

        <div className={styles.applyFilters}>
          {
            [1, 2, 3, 3].map(() => (
              <Tooltip title="Убрать фильтр">

                <Chip label="Даты начала после 2022-10-07" variant="outlined" onDelete={handleDelete} />
              </Tooltip>
            ))
          }

        </div>
        <div className={styles.activities}>
          {Activities && Activities?.map((row) => (
            <div className={styles.activity}>
              <Accordion >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div className={styles.header}>
                    <div className={styles.meta}>
                      <Typography>{row.title}</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>c {row.dateStart} до {row.dateEnd}</Typography>
                    </div>

                  </div>
                </AccordionSummary>
                <AccordionDetails>

                  <div className={styles.details}>
                    <div className={styles.activityButtons}>
                      <Tooltip title="Записаться на мероприятие">
                        <Button variant="contained">Записаться</Button>
                      </Tooltip>

                    </div>
                    <div className={styles.flexColumn}>
                      <Typography sx={{ color: 'text.secondary' }}>Описание</Typography>
                      <Typography>
                        {row.description}
                      </Typography>
                    </div>
                    <div className={styles.members}>
                      <div className={styles.flexColumn}>
                      </div>
                    </div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >

                        <Typography>Посмотреть участников</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={styles.allMembers}>

                          <Paper elevation={0} >
                            <Avatar sx={{ width: 56, height: 56 }} className={styles.memberAvatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Typography className={styles.memberName} sx={{ color: 'text.secondary' }}>Олег Лукаш</Typography>
                          </Paper>
                          <Paper elevation={0} >
                            <Avatar sx={{ width: 56, height: 56 }} className={styles.memberAvatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Typography className={styles.memberName} sx={{ color: 'text.secondary' }}>Олег Лукаш</Typography>
                          </Paper>
                          <Paper elevation={0} >
                            <Avatar sx={{ width: 56, height: 56 }} className={styles.memberAvatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Typography className={styles.memberName} sx={{ color: 'text.secondary' }}>Олег Лукаш</Typography>
                          </Paper>
                          <Paper elevation={0} >
                            <Avatar sx={{ width: 56, height: 56 }} className={styles.memberAvatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Typography className={styles.memberName} sx={{ color: 'text.secondary' }}>Олег Лукаш</Typography>
                          </Paper>
                          <Paper elevation={0} >
                            <Avatar sx={{ width: 56, height: 56 }} className={styles.memberAvatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Typography className={styles.memberName} sx={{ color: 'text.secondary' }}>Олег Лукаш</Typography>
                          </Paper>
                          <Paper elevation={0} >
                            <Avatar sx={{ width: 56, height: 56 }} className={styles.memberAvatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Typography className={styles.memberName} sx={{ color: 'text.secondary' }}>Олег Лукаш</Typography>
                          </Paper>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
};

export default ActivitiesPage;
