import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IOrder } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";

export interface OrderState {
  order: IOrder[] | null;
  fethcOrderStatus: LoadingStatus | null;
  fetchOrderError: string | null;
}

const initialState: OrderState = {
  order: null,
  fethcOrderStatus: null,
  fetchOrderError: null,
};

export const fetchOrderWithUser = createAsyncThunk(
  "order/fetchOrderWithUser",
  async (id: number) => {
    return MainApi.fetchOrderWithUser(id);
  }
);

export const fetchOrderForAnalytic = createAsyncThunk(
  "order/fetchOrderForAnalytic",
  async () => {
    return MainApi.fetchOrderForAnalytic();
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderWithUser.pending, (state) => {
        state.fethcOrderStatus = "loading";
      })
      .addCase(fetchOrderWithUser.fulfilled, (state, action) => {
        state.fethcOrderStatus = "success";
        state.order = action.payload;
      })
      .addCase(fetchOrderWithUser.rejected, (state) => {
        state.fethcOrderStatus = "failed";
      })
      .addCase(fetchOrderForAnalytic.fulfilled, (state, action) => {
        state.fethcOrderStatus = "success";
        state.order = action.payload;
      })
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
