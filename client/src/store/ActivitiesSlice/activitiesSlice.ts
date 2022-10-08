import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import {
  MainApi,
  ITransferRuble,
  ITransferRubleWithUsers,
  IActivities,
  IActivityRecords,
} from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";

export interface ActivitiesStateState {
  Activities: IActivities[] | null;
  ActivitiesRecords: IActivities[] | null;
  fethcActivitiesStatus: LoadingStatus | null;
  fetchActivitiesError: string | null;
}

const initialState: ActivitiesStateState = {
  Activities: null,
  ActivitiesRecords: null,
  fethcActivitiesStatus: null,
  fetchActivitiesError: null,
};

export const fetchActivities = createAsyncThunk(
  "Activities/fetchActivities",
  async () => {
    return MainApi.fetchActivities();
  }
);

export const fetchActivitiesWithUser = createAsyncThunk(
  "Activities/fetchActivitiesWithUser",
  async (id: number) => {
    return MainApi.fetchActivitiesWithUser(id);
  }
);

export const ActivitiesSlice = createSlice({
  name: "Activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.fethcActivitiesStatus = "loading";
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.fethcActivitiesStatus = "success";
        state.Activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state) => {
        state.fethcActivitiesStatus = "failed";
      })
      .addCase(fetchActivitiesWithUser.fulfilled, (state, action) => {
        state.fethcActivitiesStatus = "success";
        state.ActivitiesRecords = action.payload;
      });
  },
});

export const {} = ActivitiesSlice.actions;

export default ActivitiesSlice.reducer;
