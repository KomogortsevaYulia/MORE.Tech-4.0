import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IUser } from "../../api/mainApi";

export interface UserState {
  user: IUser[] | null;
  fethcUserStatus: string | null;
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
