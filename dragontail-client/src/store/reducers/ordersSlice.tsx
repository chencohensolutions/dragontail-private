import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/services";

enum EOrderItemName {
  Pizza = "Pizza",
  Pasta = "Pasta",
  Salad = "Salad",
  Drink = "Drink",
}
enum EOrderItemSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

interface IOrderItemGeneric {
  name: EOrderItemName;
  size: EOrderItemSize;
  quantity?: number;
  price: number;
}

interface IOrderItemPizzaToppoing {
  name: string;
  quarterPosition: [boolean, boolean, boolean, boolean];
}

interface IOrderItemPizza extends IOrderItemGeneric {
  name: EOrderItemName.Pizza;
  toppings: IOrderItemPizzaToppoing[];
}

interface IOrderItemPasta extends IOrderItemGeneric {
  name: EOrderItemName.Pasta;
  extraCheese: boolean;
  extraSauce: boolean;
  sauceType: string;
}

export type IOrderItem = IOrderItemGeneric | IOrderItemPizza | IOrderItemPasta;

export interface IOrder {
  id: string;
  name: string;
  email: string;
  address: string;
  timestampCreated: Date;
  timestampUpdated?: Date;
  order: IOrderItem[];
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
      });
  },
});

export const reducerOrders = ordersSlice.reducer;
