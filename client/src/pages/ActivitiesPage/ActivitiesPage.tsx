import React, { useCallback } from "react";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchActivities } from "../../store/ActivitiesSlice/activitiesSlice";
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

const ActivitiesPage = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const { Activities } = useAppSelector((state) => state.activities);

  React.useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

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
              <TextField label="Название активности" variant="outlined" />
              <TextField label="Описание активности" variant="outlined" />

              <Typography sx={{ color: "text.secondary" }}>
                Даты начала
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
                Даты окончания
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
              {user?.roleId === 1 ? (
                <Button variant="contained" className="mt-4" onClick={handleOpen}>
                  Создать активность
                </Button>
              ) : (
                null
              )}
            </div>
            <div className={styles.filtersItem}>
              <Typography sx={{ color: "text.secondary" }}>Название</Typography>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={
                  (Activities && Activities?.map((option) => option.title)) || []
                }
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: 300 }}
              />
            </div>
            <div className={styles.filtersItem}>
              <Typography sx={{ color: "text.secondary" }}>
                Даты начала до
              </Typography>

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
              <Typography sx={{ color: "text.secondary" }}>
                Даты начала после
              </Typography>
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
              <Typography sx={{ color: "text.secondary" }}>
                Применить фильтры
              </Typography>
              <Tooltip title="Применить фильтры">
                <Button variant="contained">Применить</Button>
              </Tooltip>
            </div>
          </Stack>
        </div>
      </header>

      <div className={styles.content}>
        <div className="card card-body">
          <div className={styles.activities}>
            {Activities && Activities?.map((row) => <ActivityItem row={row} />)}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ActivitiesPage;
