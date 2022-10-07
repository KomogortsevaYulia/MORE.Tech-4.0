import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, IProduct, IUser } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";

export interface AdminState {
  users: IUser[] | null;
  fetchUsersStatus: LoadingStatus | null;
  fetchUsersError: string | null;
}

const initialState: AdminState = {
  users: null,
  fetchUsersStatus: null,
  fetchUsersError: null,
};

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  return MainApi.fetchUsers();
});

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
      });
  },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
