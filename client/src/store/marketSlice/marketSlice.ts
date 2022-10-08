import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IProduct, IProductWithCustomer } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";

export interface MarketState {
  products: IProduct[] | null;
  fetchProductsStatus: LoadingStatus | null;
  fetchProductsError: string | null;
  cart: IProductWithCustomer[];
}

const initialState: MarketState = {
  products: null,
  fetchProductsStatus: null,
  fetchProductsError: null,
  cart: [],
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
  reducers: {
    addToCart(state, action: PayloadAction<IProductWithCustomer>) {
      const cartItem = action.payload;

      const index = state.cart.findIndex(
        (item) => item.product.id === cartItem.product.id
      );
      if (index !== -1) {
        state.cart[index].count! += 1;
      } else {
        state.cart.push({ ...action.payload, count: 1 });
      }
    },
  },
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
        state.fetchProductsStatus = "failed";
      });
  },
});

export const { addToCart } = marketSlice.actions;

export default marketSlice.reducer;
