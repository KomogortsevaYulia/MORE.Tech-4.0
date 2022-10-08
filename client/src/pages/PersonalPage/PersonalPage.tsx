import React from "react";
import Avatar from "@mui/material/Avatar";

import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchTransferRubleByUsers } from "../../store/transferRubleSlice/transferRubleSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  fetchActivitiesWithUser,
} from "../../store/ActivitiesSlice/activitiesSlice";
import {
  Stack,
  Chip,
} from "@mui/material";
import { fetchOrderWithUser } from "../../store/orderSlice/orderSlice";
import ActivityItem from "../../components/ActivityItem/ActivityItem";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PersonalPage = () => {
  const { user, fethcUserStatus } = useAppSelector((state) => state.user);
  React.useEffect(() => { }, [user]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchTransferRubleByUsers(user!.id));
    dispatch(fetchActivitiesWithUser(user!.id));
    dispatch(fetchOrderWithUser(user!.id));
  }, [dispatch, user]);

  const { transferRuble } = useAppSelector((state) => state.transferRuble);
  const { ActivitiesRecords } = useAppSelector((state) => state.activities);
  const { order } = useAppSelector((state) => state.orders);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Avatar
            alt="ФИО"
            src={user!.image}
            sx={{ width: "100%", height: "100%", border: "1px solid black" }}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h3" gutterBottom>
            {user?.FIO}
          </Typography>
          {/* <Typography variant="h4" gutterBottom>
            Статус
          </Typography> */}
          <Stack direction="row" spacing={1}>
            <Chip
              label={`${user?.balance.coinsAmount.toLocaleString()} Digital Ruble`}
              variant="outlined"
              sx={{
                background:
                  user?.balance.coinsAmount !== "0"
                    ? "var(--purple)"
                    : "var(--red)",
              }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Активности" {...a11yProps(0)} />
          <Tab label="Заказы" {...a11yProps(1)} />
          <Tab label="Начисления/списания" {...a11yProps(2)} />
          <Tab label="NFT" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          {ActivitiesRecords &&
            ActivitiesRecords?.map((row) => <ActivityItem row={row} />)}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Товар</TableCell>
                <TableCell align="left">Количество</TableCell>
                <TableCell align="left">Сумма</TableCell>
                <TableCell align="left">Дата</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order &&
                order?.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.product.title}</TableCell>

                    <TableCell align="left">{row.count}</TableCell>
                    <TableCell align="left">{row.sum}</TableCell>
                    <TableCell align="left">{row.date.split("T")[0]}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Кто</TableCell>
                <TableCell align="left">Кому</TableCell>
                <TableCell align="left">Сколько</TableCell>
                <TableCell align="left">Дата</TableCell>
                <TableCell align="left">Причина</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transferRuble &&
                transferRuble?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.user.FIO}</TableCell>
                    <TableCell align="left">{row.users2.FIO}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left">{row.date.split("T")[0]}</TableCell>
                    <TableCell align="left">{row.why}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={value} index={3}>
        NFT
      </TabPanel>
    </div>
  );
};

export default PersonalPage;
