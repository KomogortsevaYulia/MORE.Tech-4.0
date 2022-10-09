import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IUser, IUserWithBalance } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";
import { BlockchainApi } from "../../api/blockchainApi";

export interface UserState {
  user: IUserWithBalance | null;
  fethcUserStatus: LoadingStatus | null;
  fetchUserError: string | null;
}

const initialState: UserState = {
  user: null,
  fethcUserStatus: null,
  fetchUserError: null,
};

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id: number) => {
    return MainApi.fetchUserById(id);
  }
);

export const fetchUserBalance = createAsyncThunk(
  "user/fetchUserBalance",
  async (publicKey: string) => {
    const balance = BlockchainApi.balanceFiat(publicKey);
    const balanceNFT = BlockchainApi.balanceNFT(publicKey);

    return Promise.all([balance, balanceNFT]);
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.fetchUserError = null;
      state.fethcUserStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.fethcUserStatus = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.fethcUserStatus = "success";
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.fethcUserStatus = "failed";
      })
      .addCase(fetchUserBalance.fulfilled, (state, action) => {
        const [balance, balanceNft] = action.payload;
        state.user!.balance = balance;
        state.user!.balanceNFT = balanceNft;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
