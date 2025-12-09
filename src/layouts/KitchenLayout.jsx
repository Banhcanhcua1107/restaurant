import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/1.png';

const KitchenLayout = () => {
  const navigate = useNavigate();

  // Danh sách menu bên trái
  const NAV_ITEMS = [
    { name: "Dashboard", icon: "dashboard", path: "/kitchen" }, // Mặc định vào đây
    { name: "Đơn Hàng", icon: "receipt_long", path: "/kitchen/orders" }, // (Tạm thời trỏ về cùng chỗ)
    { name: "Thực Đơn", icon: "restaurant_menu", path: "/kitchen/menu" },
    { name: "Báo Cáo", icon: "bar_chart", path: "/kitchen/reports" },
  ];

  return (
    <div className="flex h-screen w-full font-body bg-kitchen-bg-light dark:bg-kitchen-bg-dark text-slate-800 dark:text-gray-200 transition-colors duration-300">
      
      {/* SIDEBAR */}
      <aside className="hidden w-64 flex-col justify-between border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark p-4 shadow-sm md:flex transition-colors">
        
        {/* Logo & Menu */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${logo})` }}></div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold text-gray-800 dark:text-white">Table Flow</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Quản lý bếp</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.name}
                to={item.path}
                // Fix lỗi active class cho navlink trùng path
                end={item.path === '/kitchen'} 
                className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'}
                `}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-1 border-t border-gray-100 pt-4 dark:border-gray-800">
           {/* Nút thoát về trang chủ khách hàng để demo */}
          {/* <button onClick={() => navigate('/')} className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
             <span className="material-symbols-outlined">home</span>
             <p className="text-sm font-medium">Về Trang Khách</p>
          </button>
          
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
            <span className="material-symbols-outlined">settings</span>
            <p className="text-sm font-medium">Cài Đặt</p>
          </button> */}
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10">
            <span className="material-symbols-outlined">logout</span>
            <p className="text-sm font-medium">Đăng Xuất</p>
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
};

export default KitchenLayout;