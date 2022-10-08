import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IProduct, ITransferRubleWithUsers } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";
import { BlockchainApi } from "../../api/blockchainApi";
import { TransferData } from "../adminSlice/adminSlice";

export interface TransactionsState {
  transactions: ITransferRubleWithUsers[] | null;
  fetchTransactionsStatus: LoadingStatus | null;
  fetchTransactionsError: string | null;
}

const initialState: TransactionsState = {
  transactions: null,
  fetchTransactionsStatus: null,
  fetchTransactionsError: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return MainApi.fetchAllTransactions();
  }
);

export const transferRubles = createAsyncThunk(
  "admin/transferRubles",
  async (data: TransferData) => {
    const transaction = await MainApi.addTransaction({
      ...data,
    });

    console.log(transaction);

    await BlockchainApi.rubleTransfer(
      data.fromPrivateKey,
      data.toPublicKey,
      data.amount
    );

    transaction.user = await MainApi.fetchUserById(transaction.userId);
    transaction.users2 = await MainApi.fetchUserById(transaction.toId);

    return transaction;
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.fetchTransactionsStatus = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.fetchTransactionsStatus = "success";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.fetchTransactionsStatus = "failed";
      })
      .addCase(transferRubles.fulfilled, (state, action) => {
        state.transactions?.push(action.payload);
      });
  },
});

export const {} = transactionsSlice.actions;

export default transactionsSlice.reducer;
