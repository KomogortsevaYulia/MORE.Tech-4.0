import React from "react";
import styles from "./TransactionPage.module.css";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchTransactions,
  transferRubles,
} from "../../store/transactionsSlice/transactionsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Stack,
  Chip,
  tableCellClasses,
} from "@mui/material";
import { fetchUsers } from "../../store/adminSlice/adminSlice";
import { Bold } from "react-feather";

const TransactionsPage = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transactions);
  const { user } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchUsers());
  }, [dispatch]);

  const currentCourse = 10;

  const [rublesAmount, setRublesAmount] = React.useState<number | string>("");
  const handleRublesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    if (value > +user!.balance.coinsAmount) return;
    const avaliabeRubles = value / currentCourse;
    setRublesAmount(value);
    setRealRublesAmount(avaliabeRubles);
  };
  const [realRublesAmount, setRealRublesAmount] = React.useState<
    number | string
  >("");
  const handleRealRublesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = +event.target.value;
    const rublesRequired = currentCourse * value;
    if (rublesRequired > +user!.balance.coinsAmount) return;
    setRealRublesAmount(value);
    setRublesAmount(rublesRequired);
  };

  const [person, setPerson] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPerson(event.target.value as string);
  };

  const [rublesToTransfer, setRublesToTransfer] = React.useState<
    string | number
  >("");
  const handleRublesToTransferChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = +event.target.value;
    if (value > +user!.balance.coinsAmount) return;
    setRublesToTransfer(value);
  };

  const [reason, setReason] = React.useState<string>("");
  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setReason(value);
  };

  const handleTransfer = () => {
    dispatch(
      transferRubles({
        amount: +rublesToTransfer,
        userId: user!.id,
        toId: users!.find((user) => user.publicKey === person)!.id,
        fromPrivateKey: user!.privateKey,
        toPublicKey: person,
        why: reason || "По доброте душевной",
      })
    );
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8e47e4",
      color: "#FFFFFF",
      fontSize: 16,

    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "24px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ maxWidth: "12vw" }} className="col ">
            <div className="row d-flex justify-content-center">
              <div className={`${styles.coin} `}>
                <div className={`${styles.side} ${styles.head}`}>1</div>
                <div className={`${styles.side} ${styles.tail}`}>1</div>
                <div className={`${styles.edge}`}></div>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <h2 className="fw-normal">{user?.balance.coinsAmount.toLocaleString()}</h2>
            </div>
          </div>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <Typography variant="h3" component="h5">
              Вывод в рубли
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TextField
                variant="outlined"
                label="Я отдам"
                type="number"
                value={rublesAmount.toString()}
                onChange={handleRublesChange}
              />{" "}
              Digital Rubles
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-2">
                <ArrowDownwardIcon color="success" />
              </div>
              <div className="col-auto">
                <Typography sx={{ color: "#1F9D57", fontSize: 12 }} component="p">
                  {currentCourse} Digital Rubles = 1 Цифровой рубль
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TextField
                variant="outlined"
                label="Я получу"
                type="number"
                value={realRublesAmount.toString()}
                onChange={handleRealRublesChange}
              />{" "}
              <span style={{ maxWidth: "6vw" }}>
                Цифровых рублей банка России
              </span>
            </div>
            <Button variant="outlined">Вывести</Button>
          </div>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <Typography variant="h3" component="h5">
              Переводы другим
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Кому</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={person}
                label="Кому"
                onChange={handleChange}
              >
                {users &&
                  users?.map((user) => (
                    <MenuItem value={user.publicKey} key={user.id}>
                      {user.FIO}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TextField
                variant="outlined"
                label="Количество"
                type="number"
                value={rublesToTransfer.toString()}
                onChange={handleRublesToTransferChange}
              />{" "}
              <span style={{ maxWidth: "6vw" }}>Digital Rubles</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TextField
                variant="outlined"
                label="Сообщение"
                value={reason}
                onChange={handleReasonChange}
              />{" "}
            </div>
            <Button variant="outlined" onClick={handleTransfer}>
              Перевести
            </Button>
          </Box>
        </div>
      </Box>
      <Divider sx={{ marginTop: "64px" }} />
      <Typography variant="h4" component="h2" style={{ marginTop: "64px" }}>
        Транзакции
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">От кого</StyledTableCell>
              <StyledTableCell align="left">Кому</StyledTableCell>
              <StyledTableCell align="left">Количество</StyledTableCell>
              <StyledTableCell align="left">Дата</StyledTableCell>
              <StyledTableCell align="left">Причина</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: index % 2 === 0 ? "#D9D9D9" : "",
                  }}
                >
                  <StyledTableCell align="left">{row.user.FIO}</StyledTableCell>
                  <StyledTableCell align="left">{row.users2.FIO}</StyledTableCell>
                  <StyledTableCell align="left">{row.amount}</StyledTableCell>
                  <StyledTableCell align="left">{row.date.split("T")[0]}</StyledTableCell>
                  <StyledTableCell align="left">{row.why}</StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionsPage;
