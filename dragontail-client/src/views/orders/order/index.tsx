import { useParams } from "react-router";
import {
  IOrder,
  RootState,
  useAppSelector,
  selectOrderById,
  IOrderItemPizza,
  IOrderItemPasta,
  IOrderItemPizzaToppoing,
  EOrderItemName,
  IOrderItemOther,
} from "@/store";

import styles from "./order.module.scss";

const orderEqual = (prev: IOrder | undefined, next: IOrder | undefined) => {
  if (prev === next) return true;
  if (!prev || !next) return false;
  if (prev.id !== next.id) return false;
  if (prev.timestampUpdated !== next.timestampUpdated) return false;
  return true;
};

interface OrderItemPastaProps {
  item: IOrderItemPasta;
}
const OrderItemPasta = ({ item }: OrderItemPastaProps) => {
  return (
    <li>
      <div className={styles.name}>{item.name}</div>
      <div className={styles.content}>
        <div className={styles.record}>
          <div className={styles.label}>Quantity:</div>
          <div className={styles.value}>{item.quantity || 1}</div>
        </div>
        <div className={styles.record}>
          <div className={styles.label}>Size:</div>
          <div className={styles.value}>{item.size}</div>
        </div>
        <div className={styles.record}>
          <div className={styles.label}>Sauce:</div>
          <div className={styles.value}>{item.sauceType}</div>
        </div>
        <div className={styles.record}>
          {item.extraCheese && <div className={styles.value}>Extra Cheese</div>}
        </div>
        <div className={styles.record}>
          {item.extraSauce && <div className={styles.value}>Extra Sauce</div>}
        </div>
      </div>
    </li>
  );
};

interface OrderItemPizzaToppingPositionProps {
  topping: IOrderItemPizzaToppoing;
}
const OrderItemPizzaToppingPosition = ({
  topping,
}: OrderItemPizzaToppingPositionProps) => {
  return (
    <div className={styles.position}>
      {topping.quarterPosition[0] && topping.quarterPosition[0] === true && (
        <div>Top Left</div>
      )}
      {topping.quarterPosition[1] && topping.quarterPosition[1] === true && (
        <div>Top Right</div>
      )}
      {topping.quarterPosition[2] && topping.quarterPosition[2] === true && (
        <div>Bottom Right</div>
      )}
      {topping.quarterPosition[3] && topping.quarterPosition[3] === true && (
        <div>Bottom Left</div>
      )}
    </div>
  );
};
interface OrderItemPizzaProps extends OrderItemProps {
  item: IOrderItemPizza;
}
const OrderItemPizza = ({ item }: OrderItemPizzaProps) => {
  return (
    <li>
      <div className={styles.name}>{item.name}</div>
      <div className={styles.content}>
        <div className={styles.record}>
          <div className={styles.label}>Quantity:</div>
          <div className={styles.value}>{item.quantity || 1}</div>
        </div>
        <div className={styles.record}>
          <div className={styles.label}>Size:</div>
          <div className={styles.value}>{item.size || "Normal"}</div>
        </div>
        <div className={styles.toppings}>
          <div className={styles.label}>Toppings:</div>
          <ul>
            {item.toppings.map((topping, index) => (
              <li key={index}>
                <div className={styles.label}>{topping.name}</div>
                <OrderItemPizzaToppingPosition topping={topping} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

interface OrderItemProps {
  item: IOrderItemPizza | IOrderItemPasta | IOrderItemOther;
}
const OrderItem = ({ item }: OrderItemProps) => {
  switch (item.name) {
    case EOrderItemName.Pizza:
      return <OrderItemPizza item={item} />;
    case EOrderItemName.Pasta:
      return <OrderItemPasta item={item} />;
    default:
      return (
        <li>
          <div className={styles.name}>{item.details}</div>
        </li>
      );
  }
};

export const ViewOrder = () => {
  console.log("ViewOrder render");
  const { orderId } = useParams();
  const order = useAppSelector(
    (state: RootState) => selectOrderById(state, orderId),
    orderEqual
  );

  if (!order) {
    return <div className={styles.root}>Order not found</div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.details}>
        <div className={styles.record}>
          <div className={styles.label}>Name:</div>
          <div className={styles.value}>{order.name}</div>
        </div>
        <div className={styles.record}>
          <div className={styles.label}>Address:</div>
          <div className={styles.value}>{order.address}</div>
        </div>
      </div>
      <ul className={styles.items}>
        {order.items.map((item, index) => (
          <OrderItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};
