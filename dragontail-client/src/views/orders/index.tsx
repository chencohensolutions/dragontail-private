// import { useState } from "react";
import { Outlet } from "react-router";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store";

export const ViewOrders = () => {
  //   const [order, setOrder] = useState(null);
  const orders = useAppSelector((state: RootState) => state.orders.orders);

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
