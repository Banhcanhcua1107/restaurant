import { Routes, Route } from 'react-router-dom';
import WelcomePage from '../pages/client/WelcomePage';
import MenuPage from '../pages/client/MenuPage'; // <--- Import trang Menu
import AdminDashboard from '../pages/admin/AdminDashboard';
import KitchenQueue from '../pages/kitchen/KitchenQueue';
import CartPage from '../pages/client/CartPage';
import OrderTrackingPage from '../pages/client/OrderTrackingPage';
import OrderHistoryPage from '../pages/client/OrderHistoryPage';
import OrderDetailPage from '../pages/client/OrderDetailPage';

import KitchenLayout from '../layouts/KitchenLayout';
import OrderQueue from '../pages/kitchen/OrderQueue';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Client */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/menu" element={<MenuPage />} />  {/* <--- Route cho menu */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/track" element={<OrderTrackingPage />} />
      <Route path="/history" element={<OrderHistoryPage />} />
      <Route path="/order/:id" element={<OrderDetailPage />} />

      {/* Kitchen */}
       <Route path="/kitchen" element={<KitchenLayout />}>
        {/* Mặc định vào /kitchen sẽ hiện OrderQueue */}
        <Route index element={<OrderQueue />} />
        <Route path="queue" element={<OrderQueue />} />
      </Route>


      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="*" element={<div className="p-10 text-center text-white">404 - Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;