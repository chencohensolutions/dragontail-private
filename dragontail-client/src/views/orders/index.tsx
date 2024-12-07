import { Outlet, useNavigate, useParams } from "react-router";
import { memo } from "react";
import { useAppSelector, selectorOrders, IOrder } from "@/store";
import styles from "./orders.module.scss";

const ordersEqual = (prev: IOrder[], next: IOrder[]): boolean => {
  if (prev.length !== next.length) {
    return false;
  }
  for (let i = 0; i < prev.length; i++) {
    if (
      prev[i].id !== next[i].id ||
      prev[i].timestampUpdated !== next[i].timestampUpdated
    ) {
      return false;
    }
  }
  return true;
};

interface IOrderItemProps {
  id: string;
  name: string;
  address: string;
  active: boolean;
}
const OrderItem = memo(
  ({ id, name, address, active = false }: IOrderItemProps) => {
    console.log("OrderItem render");
    const navigate = useNavigate();
    const onClick = () => {
      navigate(`/orders/${id}`);
    };

    return (
      <li onClick={onClick} className={active ? styles.active : ""}>
        <div className={styles.name}>{name}</div>
        <div className={styles.address}>{address}</div>
      </li>
    );
  }
);

export const ViewOrders = memo(() => {
  const orders = useAppSelector(selectorOrders, ordersEqual);
  const params = useParams();
  console.log("ViewOrders render", params);

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {orders.map(({ id, name, address }) => (
          <OrderItem
            key={id}
            id={id}
            name={name}
            address={address}
            active={params.orderId === id}
          />
        ))}
      </ul>
      <Outlet />
    </div>
  );
});
