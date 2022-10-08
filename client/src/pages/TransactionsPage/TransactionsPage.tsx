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
} from "@mui/material";

const TransactionsPage = () => {
  const dispatch = useAppDispatch();
  const { transactions } = useAppSelector((state) => state.transactions);

  React.useEffect(() => {
    dispatch(fetchTransactions());
  }, [transactions]);

  return (
    <>
      <Typography variant="h4" component="h2">
        Транзакции
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">От кого</TableCell>
              <TableCell align="right">Кому</TableCell>
              <TableCell align="right">Количество</TableCell>
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
