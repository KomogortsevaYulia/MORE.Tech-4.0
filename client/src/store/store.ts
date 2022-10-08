import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import marketSlice from "./marketSlice/marketSlice";
import userSlice from "./userSlice/userSlice";
import transferRubleSlice from "./transferRubleSlice/transferRubleSlice";
import adminSlice from "./adminSlice/adminSlice";
import activitiesSlice from "./ActivitiesSlice/activitiesSlice";
import transactionsSlice from "./transactionsSlice/transactionsSlice";
import ordersSlice from "./orderSlice/orderSlice";
export const store = configureStore({
  reducer: {
    market: marketSlice,
    user: userSlice,
    transferRuble: transferRubleSlice,
    admin: adminSlice,
    activities: activitiesSlice,
    transactions: transactionsSlice,
    orders: ordersSlice,
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
