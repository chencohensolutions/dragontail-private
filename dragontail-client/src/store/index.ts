import { configureStore } from "@reduxjs/toolkit";
import { reducerOrders } from "./reducers/ordersSlice";

export * from "./reducers/ordersSlice";
export * from "./selectors";

export const store = configureStore({
  reducer: {
    orders: reducerOrders,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
