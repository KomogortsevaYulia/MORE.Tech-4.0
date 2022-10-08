import React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
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

  React.useEffect(() => {}, [user]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dispatch = useAppDispatch();

  const { transferRuble } = useAppSelector((state) => state.transferRuble);
  React.useEffect(() => {
    console.log(transferRuble);
  }, [transferRuble]);

  React.useEffect(() => {
    dispatch(fetchTransferRubleByUsers(user!.id));
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Avatar
            alt="ФИО"
            src={user!.image}
            sx={{ width: 150, height: 150, border: "1px solid black" }}
          />
        </Grid>
        <Grid item xs={2}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemText primary={user?.FIO} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Статус" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Баланс: ${user?.balance.coinsAmount.toLocaleString()}`}
              />
            </ListItem>
          </List>
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
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Активности
      </TabPanel>
      <TabPanel value={value} index={1}>
        Заказы
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ФИО кто</TableCell>
                <TableCell align="right">ФИО</TableCell>
                <TableCell align="right">Сколько</TableCell>
                <TableCell align="right">Причина</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transferRuble &&
                transferRuble?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.user.FIO}</TableCell>
                    <TableCell align="right">{row.users2.FIO}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.why}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </div>
  );
};

export default PersonalPage;
