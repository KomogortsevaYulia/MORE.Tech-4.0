import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import marketSlice from "./marketSlice/marketSlice";
import userSlice from "./userSlice/userSlice";
import transferRubleSlice from "./transferRubleSlice/transferRubleSlice";
import adminSlice from "./adminSlice/adminSlice";

export const store = configureStore({
  reducer: {
    market: marketSlice,
    user: userSlice,
    transferRuble: transferRubleSlice,
    admin: adminSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
