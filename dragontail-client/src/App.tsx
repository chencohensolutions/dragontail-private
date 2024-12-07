import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ViewOrders } from '@/views/orders';
import { ViewOrder } from '@/views/orders/order';
import { useAppDispatch } from '@/hooks';
import { fetchOrders } from '@/reducers';
import './App.scss'

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" />} />
        <Route path="/orders" element={<ViewOrders />}>
          <Route path=":orderId" element={<ViewOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App
