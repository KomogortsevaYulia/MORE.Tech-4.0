import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IUser, IUserWithBalance } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";

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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
