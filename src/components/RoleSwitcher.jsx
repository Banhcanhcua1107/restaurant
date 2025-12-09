import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RoleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const roles = [
    { 
      label: 'Khách Hàng', 
      path: '/', 
      icon: 'restaurant_menu', 
      // Sửa tại đây: Thêm dark:text-sky-400 để ép buộc màu icon khi nền tối
      color: 'text-primary dark:text-sky-400' 
    },
    { 
      label: 'Bếp (Kitchen)', 
      path: '/kitchen', 
      icon: 'skillet', 
      // Sửa tại đây: Thêm dark:text-orange-400
      color: 'text-orange-500 dark:text-orange-400' 
    },
    { 
      label: 'Quản Trị (Admin)', 
      path: '/admin', 
      icon: 'dashboard', 
      // Sửa tại đây: Thêm dark:text-red-400
      color: 'text-red-500 dark:text-red-400' 
    }
  ];

  const handleSwitch = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative"> 
      {/* MENU DROPDOWN (HIỆN LÊN TRÊN) */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 w-56 rounded-xl bg-white p-2 shadow-xl ring-1 ring-gray-900/5 dark:bg-slate-900 dark:ring-white/10 animate-fade-in-up origin-bottom-left">
          <div className="mb-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Chọn Vai Trò
          </div>
          
          <div className="space-y-1">
            {roles.map((role) => (
              <button
                key={role.path}
                onClick={() => handleSwitch(role.path)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors 
                  ${location.pathname === role.path 
                    ? 'bg-sky-50 text-primary dark:bg-sky-900/20 dark:text-sky-400' 
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}
                `}
              >
                {/* Class màu của icon bây giờ đã có dark:text-... nên sẽ không bị đè bởi nút cha nữa */}
                <span className={`material-symbols-outlined ${role.color} text-[20px]`}>
                  {role.icon}
                </span>
                {role.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* NÚT BẤM CHÍNH */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 shadow-md text-slate-600 transition-all hover:scale-110 dark:bg-slate-850 dark:border-slate-700 dark:text-white"
        title="Đổi vai trò"
      >
        <span className="material-symbols-outlined text-2xl">
          {isOpen ? 'close' : 'dataset'}
        </span>
      </button>
    </div>
  );
};

export default RoleSwitcher;