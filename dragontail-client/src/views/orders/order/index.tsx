import { useParams } from "react-router";

export const ViewOrder = () => {
  const { orderId } = useParams();
  return (
    <div>
      <h1>Order {orderId}</h1>
    </div>
  );
};
