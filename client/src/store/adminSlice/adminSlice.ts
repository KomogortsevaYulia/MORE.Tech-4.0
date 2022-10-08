import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IProduct, IUser, IUserWithBalance } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";
import { BalanceNFT, BlockchainApi } from "../../api/blockchainApi";
import { StringLiteral } from "typescript";

export interface AdminState {
  users: IUserWithBalance[] | null;
  nftCollections: BalanceNFT | null;
  fetchUsersStatus: LoadingStatus | null;
  fetchUsersError: string | null;
}

export interface TransferData {
  userId: number;
  toId: number;
  fromPrivateKey: string;
  toPublicKey: string;
  amount: number;
  why: string;
}

const initialState: AdminState = {
  users: null,
  nftCollections: null,
  fetchUsersStatus: null,
  fetchUsersError: null,
};

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  return MainApi.fetchUsers();
});

export const fetchNFTBalance = createAsyncThunk(
  "admin/fetchNFTBalance",
  async (key: string) => {
    return BlockchainApi.balanceNFT(key);
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

      .addCase(fetchNFTBalance.fulfilled, (state, action) => {
        state.nftCollections = action.payload;
      });
  },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
