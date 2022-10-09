import React from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./PersonalPage.module.css";
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
import { fetchActivitiesWithUser } from "../../store/ActivitiesSlice/activitiesSlice";
import { fetchOrderWithUser } from "../../store/orderSlice/orderSlice";
import ActivityItem from "../../components/ActivityItem/ActivityItem";
import { fetchNFTBalance } from "../../store/adminSlice/adminSlice";
import NftCard from "../AdminPage/NftCard/NftCard";

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
  const { user } = useAppSelector((state) => state.user);
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
    dispatch(fetchNFTBalance(user!.publicKey));
  }, [dispatch, user]);

  const { transferRuble } = useAppSelector((state) => state.transferRuble);
  const { ActivitiesRecords } = useAppSelector((state) => state.activities);
  const { order } = useAppSelector((state) => state.orders);
  const { nftCollections } = useAppSelector((state) => state.admin);

  return (
    <div>
      <Grid container spacing={2}>
        <div className="w-100 d-flex flex-row  justify-content-between">
          <div className=" p-2 m-2 d-flex flex-row align-items-center">
            <Avatar
              alt="ФИО"
              src={user!.image}
              sx={{
                width: "10rem",
                height: "10rem",
                border: "1px solid black",
              }}
            />
            <Typography className=" ps-4 " variant="h3" gutterBottom>
              {user?.FIO}
            </Typography>
          </div>
          <div style={{ maxWidth: "12vw" }} className="p-2 m-2">
            <div className="row d-flex justify-content-center p-2 m-2">
              <div className={`${styles.coin} `}>
                <div className={`${styles.side} ${styles.head}`}>DR</div>
                <div className={`${styles.side} ${styles.tail}`}>DR</div>
                <div className={`${styles.edge}`}></div>
              </div>
            </div>
            <div className=" text-center">
              <h2 className="fw-normal">
                {user?.balance?.coinsAmount.toLocaleString() ||
                  "Загружается..."}
              </h2>
            </div>
          </div>
        </div>
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
            ActivitiesRecords?.map((row) => (
              <ActivityItem key={row.id} row={row} withoutButton={true} />
            ))}
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
        <Grid style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {nftCollections &&
            nftCollections.balance.map((nft) => <NftCard nft={nft} />)}
        </Grid>
      </TabPanel>
    </div>
  );
};

export default PersonalPage;
