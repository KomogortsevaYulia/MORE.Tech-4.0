import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IProduct, ITransferRubleWithUsers } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";

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
      });
  },
});

export const {} = transactionsSlice.actions;

export default transactionsSlice.reducer;
