import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/services";
// Define a type for the slice state

enum OrderItemName {
    Pizza = "Pizza",
    Pasta = "Pasta",
    Salad = "Salad",
    Drink = "Drink",
}
enum OrderItemSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

interface OrderItemGeneric {
    name: OrderItemName;
    size: OrderItemSize;
    quantity?: number;
    price: number;
}

interface OrderItemPizzaToppoing {
    name: string;
    quarterPosition: [boolean, boolean, boolean, boolean];
}

interface OrderItemPizza extends OrderItemGeneric {
    name: OrderItemName.Pizza;
    toppings: OrderItemPizzaToppoing[];
}

interface OrderItemPasta extends OrderItemGeneric {
    name: OrderItemName.Pasta;
    extraCheese: boolean;
    extraSauce: boolean;
    sauceType: string;
}

type OderItem = OrderItemGeneric | OrderItemPizza | OrderItemPasta;

interface Order {
  id: string;
  name: string;
  email: string;
  order: OderItem[]
}

interface OrdersState {
  orders: Order[];
  status: FetchOrderStatus;
  error: string | null;
}

export enum FetchOrderStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

// Define the initial state using that type
const initialState: OrdersState = {
  orders: [],
  status: FetchOrderStatus.Idle,
  error: null,
};

// Create an async thunk to fetch orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await api.getOrders()
  return response.data;
});

// Create a slice
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

export default ordersSlice.reducer;
