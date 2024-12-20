import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/services";

export enum EOrderItemName {
  Pizza = "Pizza",
  Pasta = "Pasta",
  Salad = "Salad",
  Other = "Other",
}
enum EOrderItemSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

export interface IOrderItemGeneric {
  name: EOrderItemName;
  quantity?: number;
  price: number;
}

export interface IOrderItemPizzaToppoing {
  name: string;
  quarterPosition: [boolean, boolean, boolean, boolean]; // top left, top right, bottom right, bottom left
}

export interface IOrderItemOther extends IOrderItemGeneric {
  name: EOrderItemName.Other;
  details: string;
}

export interface IOrderItemPizza extends IOrderItemGeneric {
  name: EOrderItemName.Pizza;
  size: EOrderItemSize;
  toppings: IOrderItemPizzaToppoing[];
}

export interface IOrderItemPasta extends IOrderItemGeneric {
  name: EOrderItemName.Pasta;
  size: EOrderItemSize;
  extraCheese: boolean;
  extraSauce: boolean;
  sauceType: string;
}

export type IOrderItem = IOrderItemPizza | IOrderItemPasta | IOrderItemOther;

export enum EOrderStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Ready = "Ready",
  Delivered = "Delivered",
}

export interface IOrder {
  id: string;
  name: string;
  email: string;
  address: string;
  status: EOrderStatus;
  timestampCreated: Date;
  timestampUpdated?: Date;
  items: IOrderItem[];
}

interface OrdersState {
  orders: IOrder[];
  status: FetchOrderStatus;
  error: string | null;
}

export enum FetchOrderStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

const initialState: OrdersState = {
  orders: [],
  status: FetchOrderStatus.Idle,
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const orders = await api.getOrders();
  return orders;
});

export const advanceOrder = createAsyncThunk(
  "orders/processOrder",
  async (orderId: string) => {
    const order = await api.advanceOrder(orderId);
    return order;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = FetchOrderStatus.Loading;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = FetchOrderStatus.Succeeded;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = FetchOrderStatus.Failed;
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(advanceOrder.pending, (state, action) => {
        const orderId = action.meta.arg;
        const order = state.orders.find((order) => order.id === orderId);
        if (order) {
          order.status = EOrderStatus.InProgress;
        }
      })
      .addCase(advanceOrder.rejected, (state, action) => {
        const orderId = action.meta.arg;
        const order = state.orders.find((order) => order.id === orderId);
        if (order) {
          order.status = EOrderStatus.InProgress;
        }
      });
  },
});

export const reducerOrders = ordersSlice.reducer;
