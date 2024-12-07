import { useParams } from "react-router";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import { IOrder, RootState, useAppSelector } from "@/store";
import { selectOrderById } from "@/store/selectors";

import styles from "./order.module.scss";

const orderEqual = (prev: IOrder | undefined, next: IOrder | undefined) => {
  if (prev === next) return true;
  if (!prev || !next) return false;
  if (prev.id !== next.id) return false;
  if (prev.timestampUpdated !== next.timestampUpdated) return false;
  return true;
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
      <h1>Order {orderId}</h1>
      <SimpleTreeView expandedItems={["1"]}>
        <TreeItem itemId="1" label="Order details">
          <TreeItem itemId="2" label={`Name: ${order.name}`} />
          <TreeItem itemId="3" label={`Address: ${order.address}`} />
        </TreeItem>
      </SimpleTreeView>
    </div>
  );
};
