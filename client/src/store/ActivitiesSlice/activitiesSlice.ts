import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { MainApi, ITransferRuble, ITransferRubleWithUsers, IActivities } from "../../api/mainApi";
import { LoadingStatus } from "../../types/types";

export interface ActivitiesStateState {
  Activities: IActivities[] | null;
  fethcActivitiesStatus: LoadingStatus | null;
  fetchActivitiesError: string | null;
}

const initialState: ActivitiesStateState = {
  Activities: null,
  fethcActivitiesStatus: null,
  fetchActivitiesError: null,
};

export const fetchActivities = createAsyncThunk(
  "Activities/fetchActivities",
  async () => {
    return MainApi.fetchActivities();
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
      });
  },
});

export const {} = ActivitiesSlice.actions;

export default ActivitiesSlice.reducer;
