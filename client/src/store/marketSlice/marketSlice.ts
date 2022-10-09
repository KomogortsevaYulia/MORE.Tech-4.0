import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const addOrder = createAsyncThunk(
  "market/addOrder",
  async (data: IProductWithCustomer[]) => {
    let promises = [];
    for (let order of data) {
      promises.push(MainApi.addOrder(order));
    }

    return await Promise.all(promises);
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

    deleteFromCart(state, action: PayloadAction<IProduct>) {
      const index = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },

    clearCart(state) {
      state.cart = [];
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
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        // state.products = action.payload;
      });
  },
});

export const { addToCart } = marketSlice.actions;
export const { deleteFromCart, clearCart } = marketSlice.actions;

export default marketSlice.reducer;
