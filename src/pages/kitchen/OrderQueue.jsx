import React, { useState, useEffect } from 'react';

// Dữ liệu mẫu (Ban đầu tất cả đều New/Pending)
const MOCK_KITCHEN_ORDERS = [
  {
    id: 1, table: "Bàn 05", time: "1 phút trước", status: "new",
    items: [
      { name: "2x Gỏi Cá Mai", note: "" },
      { name: "1x Mực Hấp Gừng", note: "(Không cay)" },
      { name: "3x Nước Chanh", note: "" }
    ],
    note: "Khách dị ứng đậu phộng."
  },
  {
    id: 2, table: "Bàn 12", time: "3 phút trước", status: "new",
    items: [
      { name: "1x Lẩu Hải Sản", note: "" },
      { name: "2x Bia Tiger", note: "" }
    ],
    note: ""
  },
  {
    id: 3, table: "Bàn 02", time: "8 phút trước", status: "progress",
    items: [
      { name: "1x Cơm Chiên Hải Sản", note: "" },
      { name: "1x Nước Suối", note: "" }
    ],
    note: ""
  },
  {
    id: 4, table: "Bàn 07", time: "11 phút trước", status: "progress",
    items: [
      { name: "3x Sò Điệp Nướng", note: "" },
      { name: "1x Tôm Sú Hấp Bia", note: "" }
    ],
    note: "Tôm không lấy đầu."
  },
  {
    id: 5, table: "Bàn 01", time: "15 phút trước", status: "completed",
    items: [ { name: "1x Bia Sài Gòn", note: "" }, { name: "1x Khô Mực", note: "" } ],
    note: ""
  },
];

const OrderQueue = () => {
  const [orders, setOrders] = useState(MOCK_KITCHEN_ORDERS);
  const [filter, setFilter] = useState('all'); // 'all', 'new', 'progress', 'completed'
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Đồng hồ chạy thời gian thực
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Chuyển trạng thái đơn hàng
  const updateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Logic lọc
  const filteredOrders = orders.filter(o => filter === 'all' || o.status === filter);

  // Helper render Badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'new': return { color: 'text-status-new', bg: 'bg-orange-100 dark:bg-orange-900/30', icon: 'notifications_active', label: 'MỚI' };
      case 'progress': return { color: 'text-status-progress', bg: 'bg-amber-100 dark:bg-amber-900/30', icon: 'hourglass_top', label: 'ĐANG LÀM' };
      case 'completed': return { color: 'text-status-completed', bg: 'bg-green-100 dark:bg-green-900/30', icon: 'check_circle', label: 'HOÀN THÀNH' };
      default: return {};
    }
  };

  return (
    <div className="p-4 md:p-6 min-h-screen">
      
      {/* HEADER: Tiêu đề + Đồng hồ */}
      <header className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-900 dark:text-white text-3xl font-black uppercase tracking-tight">
            Danh sách đơn hàng - Bếp
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base">Cập nhật theo thời gian thực</p>
        </div>
        <div className="flex items-center justify-center p-3 bg-white dark:bg-surface-dark rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 mr-2">schedule</span>
          <p className="text-gray-800 dark:text-white text-lg font-bold font-mono">{currentTime}</p>
        </div>
      </header>

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 hide-scrollbar">
        {[
          { id: 'all', label: `Tất cả (${orders.length})`, icon: 'checklist', activeClass: 'bg-blue-600 text-white border-blue-600' },
          { id: 'new', label: `Mới (${orders.filter(o=>o.status==='new').length})`, icon: 'notifications_active', activeClass: 'bg-white dark:bg-surface-dark text-status-new border-status-new ring-1 ring-status-new' },
          { id: 'progress', label: `Đang làm (${orders.filter(o=>o.status==='progress').length})`, icon: 'hourglass_top', activeClass: 'bg-white dark:bg-surface-dark text-status-progress border-status-progress ring-1 ring-status-progress' },
          { id: 'completed', label: `Hoàn thành (${orders.filter(o=>o.status==='completed').length})`, icon: 'check_circle', activeClass: 'bg-white dark:bg-surface-dark text-status-completed border-status-completed ring-1 ring-status-completed' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-4 shadow-sm border transition-all duration-200
              ${filter === btn.id 
                ? btn.activeClass 
                : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}
            `}
          >
            <span className="material-symbols-outlined text-[20px]">{btn.icon}</span>
            <span className="text-sm font-bold">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* ORDER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredOrders.map((order) => {
          const badge = getStatusBadge(order.status);
          const isCompleted = order.status === 'completed';

          return (
            <div 
              key={order.id} 
              className={`flex flex-col bg-white dark:bg-surface-dark rounded-xl shadow-md border overflow-hidden transition-all duration-300
                ${order.status === 'new' ? 'border-status-new animate-fade-in-up' : ''}
                ${order.status === 'progress' ? 'border-status-progress' : ''}
                ${order.status === 'completed' ? 'border-gray-200 dark:border-gray-800 opacity-60' : 'border-transparent'}
              `}
            >
              <div className="p-5 flex-grow flex flex-col">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <h2 className="text-gray-900 dark:text-white text-xl font-black">{order.table}</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold">{order.time}</p>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badge.bg} ${badge.color}`}>
                    <span className="material-symbols-outlined text-lg">{badge.icon}</span>
                    <span className="text-xs font-black tracking-wide">{badge.label}</span>
                  </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-700 mb-4"></div>

                {/* Items List */}
                <ul className="space-y-2 mb-4 text-sm font-medium text-gray-700 dark:text-gray-300 flex-grow">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                       <span className="mr-2">•</span> 
                       <span>{item.name} <span className="text-gray-500 dark:text-gray-500 text-xs">{item.note}</span></span>
                    </li>
                  ))}
                </ul>

                {/* Note */}
                {order.note ? (
                  <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-2.5 rounded-lg border border-red-100 dark:border-red-900/20">
                    <span className="font-bold">Ghi chú:</span> {order.note}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 dark:text-gray-600 italic px-1">Không có ghi chú.</p>
                )}
              </div>

              {/* Action Button */}
              <div className="p-4 bg-gray-50 dark:bg-[#151b23] border-t border-gray-100 dark:border-gray-800">
                {order.status === 'new' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'progress')}
                    className="w-full flex h-11 items-center justify-center rounded-lg bg-status-new text-white font-bold hover:bg-orange-700 transition-colors shadow-sm active:scale-95"
                  >
                    Bắt đầu làm
                  </button>
                )}
                
                {order.status === 'progress' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'completed')}
                    className="w-full flex h-11 items-center justify-center rounded-lg bg-status-progress text-gray-900 font-bold hover:bg-amber-400 transition-colors shadow-sm active:scale-95"
                  >
                    Hoàn thành
                  </button>
                )}

                {isCompleted && (
                  <button disabled className="w-full flex h-11 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold cursor-not-allowed">
                    <span className="material-symbols-outlined text-lg mr-2">check</span>
                    Đã xong
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default OrderQueue;