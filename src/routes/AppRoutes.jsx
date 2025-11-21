import { Routes, Route } from 'react-router-dom';
import WelcomePage from '../pages/client/WelcomePage';
import MenuPage from '../pages/client/MenuPage'; // <--- Import trang Menu
import AdminDashboard from '../pages/admin/AdminDashboard';
import KitchenQueue from '../pages/kitchen/KitchenQueue';
import CartPage from '../pages/client/CartPage';
import OrderTrackingPage from '../pages/client/OrderTrackingPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Client */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/menu" element={<MenuPage />} />  {/* <--- Route cho menu */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/track" element={<OrderTrackingPage />} />

      
      {/* Kitchen */}
      <Route path="/kitchen" element={<KitchenQueue />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="*" element={<div className="p-10 text-center text-white">404 - Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;