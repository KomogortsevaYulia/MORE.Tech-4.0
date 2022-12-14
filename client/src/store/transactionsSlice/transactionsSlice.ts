import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import {
  MainApi,
  IProduct,
  ITransferRubleWithUsers,
  ITransferNftWithUsers,
} from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";
import { BlockchainApi, NFT } from "../../api/blockchainApi";
import { TransferData } from "../adminSlice/adminSlice";

interface ITransferNft {
  fromPrivateKey: string;
  toPublicKey: string;
  tokenId: number;
}

interface TransferNftData {
  userId: number;
  toId: number;
  fromPrivateKey: string;
  toPublicKey: string;
  nft: NFT;
  why: string;
}

export interface TransactionsState {
  transactions: ITransferRubleWithUsers[] | null;
  transactionsNft: ITransferNftWithUsers[] | null;
  fetchTransactionsStatus: LoadingStatus | null;
  fetchTransactionsError: string | null;
}

const initialState: TransactionsState = {
  transactions: null,
  transactionsNft: null,
  fetchTransactionsStatus: null,
  fetchTransactionsError: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return MainApi.fetchAllTransactions();
  }
);

export const fetchTransactionsNft = createAsyncThunk(
  "transactions/fetchTransactionsNft",
  async () => {
    return MainApi.fetchAllNftTransactions();
  }
);

export const transferNft = createAsyncThunk(
  "transactions/transferNft",
  async (data: TransferNftData) => {
    const transaction = await MainApi.addNftTransaction({
      ...data,
    });
    console.log(transaction);

    await BlockchainApi.nftTransfer(
      data.fromPrivateKey,
      data.toPublicKey,
      data.nft.tokens[0]
    );

    transaction.user = await MainApi.fetchUserById(transaction.userId);
    transaction.users2 = await MainApi.fetchUserById(transaction.toId);

    return transaction;
  }
);

export const transferRubles = createAsyncThunk(
  "admin/transferRubles",
  async (data: TransferData | TransferData[]) => {
    let transaction;

    if (!Array.isArray(data)) {
      transaction = await MainApi.addTransaction({
        ...data,
      });

      await BlockchainApi.rubleTransfer(
        data.fromPrivateKey,
        data.toPublicKey,
        data.amount
      );

      transaction.user = await MainApi.fetchUserById(transaction.userId);
      transaction.users2 = await MainApi.fetchUserById(transaction.toId);

      return transaction;
    } else {
      transaction = data.map((t) =>
        MainApi.addTransaction({
          ...t,
        })
      );

      const performs = data.map((t) =>
        BlockchainApi.rubleTransfer(t.fromPrivateKey, t.toPublicKey, t.amount)
      );

      transaction = await Promise.all(transaction).then((data) => data);
      await Promise.all(performs).then((data) => data);

      return await Promise.all(
        transaction.map(async (t) => ({
          ...t,
          user: await MainApi.fetchUserById(t.userId),
          users2: await MainApi.fetchUserById(t.toId),
        }))
      );
    }
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
      .addCase(fetchTransactionsNft.fulfilled, (state, action) => {
        state.transactionsNft = action.payload;
      })
      .addCase(transferRubles.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.transactions?.push(...action.payload);
        } else {
          state.transactions?.push(action.payload);
        }
      })
      .addCase(transferNft.fulfilled, (state, action) => {
        state.transactionsNft?.push(action.payload);
      });
  },
});

export default transactionsSlice.reducer;
