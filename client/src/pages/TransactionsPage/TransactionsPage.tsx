import React from "react";

import Paper from "@mui/material/Paper";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchTransactions } from "../../store/transactionsSlice/transactionsSlice";
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
} from "@mui/material";
import { fetchUsers } from "../../store/adminSlice/adminSlice";

const TransactionsPage = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transactions);
  const { user } = useAppSelector((state) => state.user);
  const { users } = useAppSelector((state) => state.admin);

  React.useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchUsers());
  }, []);

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

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

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
          <div style={{ maxWidth: "12vw" }}>
            <Typography variant="h6" component="h6">
              Мой баланс: {user!.balance.coinsAmount.toLocaleString()}
            </Typography>
            <Typography variant="h6" component="h6">
              Текущий курс: {currentCourse} Digital Rubles = 1 Цифровой рублес
            </Typography>
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
              Вывод в рублесы
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
                Цифровых рублесов банка России
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
                value={age}
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
                value={realRublesAmount.toString()}
                onChange={handleRealRublesChange}
              />{" "}
              <span style={{ maxWidth: "6vw" }}>Digital Rubles</span>
            </div>
            <Button variant="outlined">Перевести</Button>
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
              <TableCell align="right">От кого</TableCell>
              <TableCell align="right">Кому</TableCell>
              <TableCell align="right">Количество</TableCell>
              <TableCell align="right">Дата</TableCell>
              <TableCell align="right">Причина</TableCell>
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
                  <TableCell align="right">{row.user.FIO}</TableCell>
                  <TableCell align="right">{row.users2.FIO}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.date.split("T")[0]}</TableCell>
                  <TableCell align="right">{row.why}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionsPage;
