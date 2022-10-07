import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IProduct } from "../../api/mainApi";

export interface MarketState {
  products: IProduct[] | null;
  fetchProductsStatus: string | null;
  fetchProductsError: string | null;
}

const initialState: MarketState = {
  products: null,
  fetchProductsStatus: null,
  fetchProductsError: null,
};

export const fetchProducts = createAsyncThunk(
  "market/fetchProducts",
  async () => {
    return MainApi.fetchMarketProducts();
  }
);

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.fetchProductsStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchProductsStatus = "success";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.fetchProductsError = "failed";
      });
  },
});

export const {} = marketSlice.actions;

export default marketSlice.reducer;
