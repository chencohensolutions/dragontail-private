import { createSelector } from "@reduxjs/toolkit";
import { IOrder } from "./reducers/ordersSlice";
import { RootState } from ".";

const selectOrders = (state: RootState) => state.orders.orders;
// @ts-expect-error: unused
const selectOrderId = (state: RootState, orderId: string | undefined) =>
  orderId;

export const selectorOrders = createSelector(
  [selectOrders],
  (orders: IOrder[]) => {
    return orders.slice().sort((a, b) => {
      if (!a.timestampUpdated || !b.timestampUpdated) {
        return 0;
      }
      return b.timestampUpdated.getTime() - a.timestampUpdated.getTime();
    });
  }
);

export const selectOrderById = createSelector(
  [selectOrders, selectOrderId],
  (orders, orderId) => {
    if (!orderId) {
      return undefined;
    }
    return orders.find((order) => order.id === orderId);
  }
);
