import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IProduct, IUser, IUserWithBalance } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";
import { BlockchainApi } from "../../api/blockchainApi";

export interface AdminState {
  users: IUserWithBalance[] | null;
  fetchUsersStatus: LoadingStatus | null;
  fetchUsersError: string | null;
}

export interface TransferData {
  userId: number;
  toId: number;
  fromPrivateKey: string;
  toPublicKey: string;
  amount: number;
}

const initialState: AdminState = {
  users: null,
  fetchUsersStatus: null,
  fetchUsersError: null,
};

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  return MainApi.fetchUsers();
});

export const transferRubles = createAsyncThunk(
  "admin/transferRubles",
  async (data: TransferData) => {
    const transaction = await MainApi.addTransaction({
      ...data,
      why: "Начисление от администратора",
    });

    console.log(transaction);

    return BlockchainApi.rubleTransfer(
      data.fromPrivateKey,
      data.toPublicKey,
      data.amount
    );
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.fetchUsersStatus = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetchUsersStatus = "success";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.fetchUsersError = "failed";
      })
      .addCase(transferRubles.fulfilled, (state, action) => {});
  },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
