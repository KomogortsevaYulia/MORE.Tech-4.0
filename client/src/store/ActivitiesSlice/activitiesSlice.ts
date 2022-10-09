import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  MainApi,
  IActivities,
  ICreateRecordUserActivity,
  ITypeActivities,
  ICreateActivity,
} from '../../api/mainApi';
import { LoadingStatus } from '../../types/types';

export interface ActivitiesStateState {
  Activities: IActivities[] | null;
  TypeActivities: ITypeActivities[] | null;
  ActivitiesRecords: IActivities[] | null;
  fethcActivitiesStatus: LoadingStatus | null;
  fetchActivitiesError: string | null;
}

const initialState: ActivitiesStateState = {
  Activities: null,
  TypeActivities: null,
  ActivitiesRecords: null,
  fethcActivitiesStatus: null,
  fetchActivitiesError: null,
};

export const fetchActivities = createAsyncThunk('Activities/fetchActivities', async () => {
  return MainApi.fetchActivities();
});

export const fetchActivitiesWithUser = createAsyncThunk(
  'Activities/fetchActivitiesWithUser',
  async (id: number) => {
    return MainApi.fetchActivitiesWithUser(id);
  },
);

export const fetchActivitiesForHome = createAsyncThunk(
  'Activities/fetchActivitiesForHome',
  async () => {
    return MainApi.fetchActivitiesForHome();
  },
);

export const fetchTypeActivities = createAsyncThunk('Activities/fetchTypeActivities', async () => {
  return MainApi.fetchTypeActivities();
});

export const patchCompletedActivities = createAsyncThunk(
  'Activities/patchCompletedActivities',
  async (id: number) => {
    return MainApi.patchCompletedActivities(id);
  },
);

export const createActivityRecord = createAsyncThunk(
  'Activities/createActivityRecord',
  async (data: ICreateRecordUserActivity) => {
    return MainApi.createActivityRecord(data.userId, data.activitiesId, data.bet);
  },
);

export const createActivity = createAsyncThunk(
  'Activities/createActivity',
  async (data: ICreateActivity) => {
    return MainApi.createActivity(data);
  },
);

export const ActivitiesSlice = createSlice({
  name: 'Activities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.fethcActivitiesStatus = 'loading';
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.fethcActivitiesStatus = 'success';
        state.Activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state) => {
        state.fethcActivitiesStatus = 'failed';
      })
      .addCase(fetchActivitiesWithUser.fulfilled, (state, action) => {
        state.fethcActivitiesStatus = 'success';
        state.ActivitiesRecords = action.payload;
      })
      .addCase(fetchTypeActivities.fulfilled, (state, action) => {
        state.fethcActivitiesStatus = 'success';
        state.ActivitiesRecords = action.payload;
      })
      .addCase(fetchActivitiesForHome.fulfilled, (state, action) => {
        state.fethcActivitiesStatus = 'success';
        state.ActivitiesRecords = action.payload;
      })
      .addCase(createActivityRecord.fulfilled, (state, action) => {
        state.Activities?.find((a) => a.id === action.payload.activitiesId)?.users.push(
          action.payload,
        );
      })
      .addCase(patchCompletedActivities.fulfilled, (state, action) => {
        state.Activities!.find((a) => a.id === action.payload.id)!.completed = true;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.Activities?.push(action.payload);
      });
  },
});

export default ActivitiesSlice.reducer;
