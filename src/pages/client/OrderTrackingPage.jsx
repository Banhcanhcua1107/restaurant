import React from 'react';
import { useNavigate } from 'react-router-dom';

// Dữ liệu giả lập đơn hàng
const ORDER_DATA = {
  id: "#123XYZ",
  date: "18:30, 24/10/2023",
  status: 2, // 1: Chờ xác nhận, 2: Đang chuẩn bị, 3: Sẵn sàng
  items: [
    { name: "Phở Bò Tái", quantity: 1, price: 65000 },
    { name: "Nem Rán", quantity: 2, price: 90000 },
    { name: "Trà Chanh", quantity: 2, price: 40000 }
  ],
  subtotal: 195000,
  fee: 19500,
  total: 214500,
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAitV_A1r8mG1PQYNg9k8Rky9xVbB4TgJWCRGpFQYkTU98I0QisAcdUYm6dfmkqaR3I7ubWqlOd8Hv5fr53liti8-vCScCxg-ZCvILgSGGV85DjJsOTLPVtcxwx5jH2gwb_MqtLCoIs_OmTrtk63FX4ePYcdq2xocThJt2dqT2zk2mwgBMBg5ULPO1Es-wO_-XH9SybNW6ntKogjFHiMPfurzPXGmO3010S3n4psHQAxgIiJdzb0qABF4HOO0YkpY85KVC_rD99upFX"
};

// Các bước trạng thái
const STEPS = [
  { step: 1, label: "Chờ xác nhận", icon: "receipt_long" },
  { step: 2, label: "Đang chuẩn bị", icon: "soup_kitchen" },
  { step: 3, label: "Sẵn sàng", icon: "check_circle" },
];

const OrderTrackingPage = () => {
  const navigate = useNavigate();

  // Format tiền tệ
  const formatMoney = (value) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-slate-900 dark:text-white transition-colors duration-300">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              
              {/* --- HEADER --- */}
              <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-gray-800 px-4 md:px-10 py-4">
                <div className="flex items-center gap-4">
                  <div className="text-primary">
                    <span className="material-symbols-outlined text-3xl">restaurant</span>
                  </div>
                  <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Ocean's Delight</h2>
                </div>
                <button 
                  onClick={() => navigate('/')}
                  className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-gray-700 transition-colors gap-2 text-sm font-bold px-4 shadow-sm"
                >
                  <span className="material-symbols-outlined text-xl">home</span>
                  <span className="hidden sm:inline">Trang chủ</span>
                </button>
              </header>

              <main className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
                
                {/* --- TITLE --- */}
                <div className="flex flex-wrap justify-between items-baseline gap-4">
                  <h1 className="text-4xl font-black leading-tight tracking-tight min-w-72">
                    Theo dõi đơn hàng
                  </h1>
                </div>

                {/* --- ORDER INFO CARD --- */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-gray-800 transition-colors">
                  <div className="flex flex-col items-stretch justify-start rounded-lg md:flex-row md:items-center">
                    <div className="w-full md:w-auto p-4 flex-shrink-0">
                      <div 
                        className="w-32 h-32 md:w-40 md:h-40 bg-center bg-no-repeat aspect-square bg-cover rounded-lg shadow-md" 
                        style={{ backgroundImage: `url('${ORDER_DATA.image}')` }}
                      ></div>
                    </div>
                    <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-2 py-4 md:px-4">
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Mã đơn hàng</p>
                      <p className="text-2xl font-bold leading-tight text-primary">{ORDER_DATA.id}</p>
                      <div className="flex items-end gap-3 justify-between mt-2">
                        <p className="text-slate-600 dark:text-slate-300 text-base">
                          Thời gian đặt: {ORDER_DATA.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- PROGRESS TRACKER (TIMELINE) --- */}
                <div className="flex flex-col gap-6 p-8 rounded-xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-gray-800">
                  <div className="relative flex items-center justify-between w-full">
                    
                    {/* Gray Line (Background) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    
                    {/* Colored Line (Progress) */}
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(ORDER_DATA.status - 1) * 50}%` }} // Logic tính % chiều dài
                    ></div>

                    {/* Steps Items */}
                    {STEPS.map((stepInfo) => {
                      const isActive = ORDER_DATA.status >= stepInfo.step;
                      const isCurrent = ORDER_DATA.status === stepInfo.step;

                      return (
                        <div key={stepInfo.step} className="relative z-10 flex flex-col items-center gap-3">
                          <div 
                            className={`flex items-center justify-center size-10 rounded-full ring-4 transition-all duration-300
                              ${isActive 
                                ? 'bg-primary ring-primary/20 shadow-lg shadow-primary/40 scale-110' 
                                : 'bg-slate-200 ring-white dark:bg-slate-700 dark:ring-slate-800'}
                            `}
                          >
                            <span className={`material-symbols-outlined text-xl ${isActive ? 'text-white' : 'text-slate-500'}`}>
                              {stepInfo.icon}
                            </span>
                          </div>
                          <p className={`text-sm font-semibold text-center ${isActive ? 'text-primary' : 'text-slate-400'}`}>
                            {stepInfo.label}
                          </p>
                          {/* Hiệu ứng Pulse cho trạng thái hiện tại */}
                          {isCurrent && (
                             <span className="absolute -top-1 right-1 flex h-3 w-3">
                               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                               <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                             </span>
                          )}
                        </div>
                      )
                    })}

                  </div>
                </div>

                {/* --- DETAILS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* List Món ăn */}
                  <div className="md:col-span-2 flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-gray-800">
                    <h3 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-2">
                      Các món đã đặt
                    </h3>
                    <div className="flex flex-col gap-2">
                      {ORDER_DATA.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                          <div className="flex flex-col">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">x{item.quantity}</p>
                          </div>
                          <p className="font-semibold">{formatMoney(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="md:col-span-1 flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-slate-900 shadow-sm ring-1 ring-slate-200 dark:ring-gray-800 h-fit">
                    <h3 className="text-xl font-bold border-b border-slate-100 dark:border-slate-800 pb-2">Tóm tắt</h3>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span>Tạm tính</span>
                        <span>{formatMoney(ORDER_DATA.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span>Phí dịch vụ (10%)</span>
                        <span>{formatMoney(ORDER_DATA.fee)}</span>
                      </div>
                      <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Tổng cộng</span>
                        <span className="text-primary">{formatMoney(ORDER_DATA.total)}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Action Button */}
                <div className="flex justify-center mt-8 pb-10">
                  <button 
                    onClick={() => navigate('/menu')}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold text-base shadow-lg hover:bg-blue-600 hover:scale-105 transition-all duration-200 active:scale-95"
                  >
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                    <span>Đặt món mới</span>
                  </button>
                </div>

              </main>

              <footer className="text-center py-6 border-t border-slate-200 dark:border-gray-800 mt-auto">
                <p className="text-slate-500 dark:text-slate-400 text-sm">© 2024 Ocean's Delight. Mọi quyền được bảo lưu.</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Cần hỗ trợ? Liên hệ: 0123 456 789</p>
              </footer>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;