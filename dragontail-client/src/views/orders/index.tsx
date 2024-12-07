import { Outlet } from "react-router";
import { useAppSelector, RootState } from "@/store";
import styles from "./orders.module.scss";


export const ViewOrders = () => {
  const orders = useAppSelector((state: RootState) => state.orders.orders);

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {orders.map((order) => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
