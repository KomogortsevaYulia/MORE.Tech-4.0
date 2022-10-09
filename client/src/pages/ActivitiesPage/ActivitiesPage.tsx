import React, { useCallback } from "react";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchActivities, fetchTypeActivities } from "../../store/ActivitiesSlice/activitiesSlice";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Button from "@mui/material/Button";
import styles from "./ActivitiesPage.module.css";
import ActivityItem from "../../components/ActivityItem/ActivityItem";
import { FormLabel, RadioGroup, FormControlLabel } from "@mui/material";
import { Radio } from "antd";
import AddIcon from '@mui/icons-material/Add';


const ActivitiesPage = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const { Activities } = useAppSelector((state) => state.activities);

  React.useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const typeActivity: any = [
    {
      title: "Соревнование",
      id: 1,
    },
     {
      title: "Челлендж",
      id: 2,
    },
     {
      title: "Обучение",
      id: 3,
    },
     {
      title: "Командное взаимодействие",
      id: 4,}
    ];
  

  const [value11, setValue11] = React.useState<Date | null>(null);
  const [value2, setValue2] = React.useState<Date | null>(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addStartDate, setAddStartDate] = React.useState<Date | null>(null);
  const [addEndDate, setAddEndDate] = React.useState<Date | null>(null);

  const handleAddActivity = useCallback(() => { }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <div className="container-sm">
      <header className={styles.filters}>
        <div className="card card-body">
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
                width: 400,
                bgcolor: "background.paper",
                borderRadius: 5,
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Добавление активности
              </Typography>

              <FormLabel id="demo-radio-buttons-group-label">Тип</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                {typeActivity && typeActivity?.map((row:any) =>
                  <FormControlLabel value={row.title} control={<Radio />} label={row.title} />
                )}
              </RadioGroup>

              <TextField label="Название активности" variant="outlined" />
              <TextField label="Описание активности" variant="outlined" />

              <Typography sx={{ color: "text.secondary" }}>
                Дата начала
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Даты начала"
                  value={addStartDate}
                  onChange={(newValue) => {
                    setAddStartDate(newValue);
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <Typography sx={{ color: "text.secondary" }}>
                Дата окончания
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Даты окончания"
                  value={addEndDate}
                  onChange={(newValue) => {
                    setAddEndDate(newValue);
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button onClick={handleAddActivity} variant="contained">
                Добавить
              </Button>
              <Button onClick={handleClose}>Отмена</Button>
            </Box>
          </Modal>

          <Stack spacing={2} direction="row" style={{ margin: "auto" }}>


            <div className={styles.filtersItem}>
              
              <Autocomplete 
                id="free-solo-demo"
                
                freeSolo
                options={
                  (Activities && Activities?.map((option) => option.title)) || []
                }
                renderInput={(params) => <TextField {...params} label="Название"/>}
                sx={{ width: 300 }} 
              />
            </div>
            <div className={styles.filtersItem}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Дата начала"
                  value={value11}
                  onChange={(newValue) => {
                    setValue11(newValue);
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.filtersItem}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Дата окончания"
                  value={value2}
                  onChange={(newValue) => {
                    setValue2(newValue);
                  }}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.filtersItem}>
              <Tooltip title="Применить фильтр">
                <Button variant="contained">Применить</Button>
              </Tooltip>
            </div>
          </Stack>
        </div>
      </header>
</div>


      <div className={styles.content}>
        <div className="card card-body">
        <div className={styles.filtersItem}>
              {user?.roleId === 1 ? (
                <Button variant="contained" className="m-2" onClick={handleOpen}>
                 <AddIcon/> Создать активность
                </Button>
              ) : (
                null
              )}
            </div>
          <div className={styles.activities}>
            {Activities && Activities?.map((row) => <ActivityItem key={row.id} row={row} />)}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ActivitiesPage;
