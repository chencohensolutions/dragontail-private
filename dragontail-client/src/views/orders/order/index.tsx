import { useParams } from "react-router";
import styles from "./order.module.scss";
import { TreeItem } from '@mui/x-tree-view/TreeItem';


export const ViewOrder = () => {
  console.log("ViewOrder render");
  const { orderId } = useParams();
  return (
    <div className={styles.root}>
      <h1>Order {orderId}</h1>
    </div>
  );
};
