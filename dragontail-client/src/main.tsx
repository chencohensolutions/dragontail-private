import { createRoot } from "react-dom/client";
import "./index.scss";
// import App from "./App.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { ViewOrders } from "@/views/orders";
import { ViewOrder } from "@/views/orders/order";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/orders" />} />
      <Route path="/orders" element={<ViewOrders />} />
      <Route path="/orders/:orderId" element={<ViewOrder />} />
    </Routes>
  </BrowserRouter>
);
