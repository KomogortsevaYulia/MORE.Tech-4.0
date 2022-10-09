import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDepartmentWithUser, MainApi } from '../../api/mainApi';

export interface DepartmentState {
  departments: IDepartmentWithUser[];
}

const initialState: DepartmentState = {
  departments: [],
};
// ----- ASYNC THUNKS ------

export const fetchDepartments = createAsyncThunk('Departments/fetchDepartments', async () => {
  return MainApi.fetchDepartmentsWithUsers();
});

export const DepartmentsSlice = createSlice({
  name: 'Departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
    });
  },
});

export default DepartmentsSlice.reducer;
