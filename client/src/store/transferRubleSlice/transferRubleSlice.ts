import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, ITransferRuble } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";

export interface TransferRubleStateState {
  transferRuble: ITransferRuble[] | null;
  fethcTransferRubleStatus: LoadingStatus | null;
  fetchTransferRubleError: string | null;
}

const initialState: TransferRubleStateState = {
  transferRuble: null,
  fethcTransferRubleStatus: null,
  fetchTransferRubleError: null,
};

export const fetchTransferRubleByUsers = createAsyncThunk(
  "transferRuble/fetchTransferRubleByUsers",
  async (id: number) => {
    return MainApi.fetchTransferRubleByUsers(id);
  }
);

export const transferRubleSlice = createSlice({
  name: "transferRuble",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransferRubleByUsers.pending, (state) => {
        state.fethcTransferRubleStatus = "loading";
      })
      .addCase(fetchTransferRubleByUsers.fulfilled, (state, action) => {
        state.fethcTransferRubleStatus = "success";
        state.transferRuble = action.payload;
      })
      .addCase(fetchTransferRubleByUsers.rejected, (state) => {
        state.fethcTransferRubleStatus = "failed";
      });
  },
});

export const {} = transferRubleSlice.actions;

export default transferRubleSlice.reducer;
