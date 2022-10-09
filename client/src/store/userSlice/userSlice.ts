import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MainApi, IUserWithBalance } from '../../api/mainApi';
import { LoadingStatus } from '../../types/types';
import { BlockchainApi } from '../../api/blockchainApi';

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

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id: number) => {
  return MainApi.fetchUserById(id);
});

export const fetchUserBalance = createAsyncThunk(
  'user/fetchUserBalance',
  async (publicKey: string) => {
    const balance = BlockchainApi.balanceFiat(publicKey);
    const balanceNFT = BlockchainApi.balanceNFT(publicKey);

    return Promise.all([balance, balanceNFT]);
  },
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.fetchUserError = null;
      state.fethcUserStatus = null;
    },
    changeBalance(state, action) {
      state.user!.balance!.coinsAmount += action.payload;
    },
    removeNftFromBalance(state, action) {
      state
        .user!.balanceNFT.balance.find((nft) => nft.uri === action.payload)
        ?.tokens.splice(0, 1);

      if (
        state.user!.balanceNFT.balance.find((nft) => nft.uri === action.payload)
          ?.tokens.length === 0
      ) {
        console.log(123);
        state.user!.balanceNFT.balance = state.user!.balanceNFT.balance.filter(
          (nft) => nft.uri !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.fethcUserStatus = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.fethcUserStatus = 'success';
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state) => {
        state.fethcUserStatus = 'failed';
      })
      .addCase(fetchUserBalance.fulfilled, (state, action) => {
        const [balance, balanceNft] = action.payload;
        state.user!.balance = balance;
        state.user!.balanceNFT = balanceNft;
      });
  },
});

export const { logout, changeBalance, removeNftFromBalance } =
  userSlice.actions;

export default userSlice.reducer;
