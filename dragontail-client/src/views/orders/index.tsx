import { Outlet, useNavigate } from "react-router";
import { useAppSelector, RootState } from "@/store";
import styles from "./orders.module.scss";


export const ViewOrders = () => {
  console.log("ViewOrders render");
  const orders = useAppSelector((state: RootState) => state.orders.orders);
  const navigate = useNavigate();

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {orders.map((order) => (
          <li key={order.id} onClick={()=>{
            navigate(`/orders/${order.id}`);
          }}>{order.name}</li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
