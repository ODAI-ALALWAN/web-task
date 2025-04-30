import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import taskSlice from "./slices/task-slice";
import userSlice from "./slices/user-slice";
import statisticSlice from "./slices/statistics-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
    user: userSlice,
    statistic: statisticSlice,
  },
});

export default store;
