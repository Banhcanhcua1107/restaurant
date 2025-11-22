import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dữ liệu giả lập lịch sử đơn hàng (Đã cập nhật thêm case Pending)
const MOCK_ORDERS = [
  {
    id: 1,
    title: "Pizza Hải sản, Mì Ý...",
    date: "15/07/2024 - 19:30",
    status: "completed", // completed | cancelled | pending
    itemsCount: 2,
    total: 350000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtxac9SC82s_YkqvnizGZnpep5nJB8vSpg5HHbdhguVMK5B8fh21MxzhXe2byFmSQMt2murRsEYpotalPD3pvtzN5Upi8LZp_8lhDlO-4fZ2w3RJF0j39Oca4hTvZBHfw_Cu5XUoLdrjLLRMYA5jAP9PY7x0OIe3DNAsnK0HjNfuRxd2-7zrXuomN_m7f8AeVgNDz143DeQ5dDzq8-MgdW4yAaqZYwBA_9JcGduGbZlu78nsci2oXL2RBroqvRrlzkVH33aQoBpPau"
  },
  {
    id: 2,
    title: "Bít tết, Salad...",
    date: "12/07/2024 - 20:00",
    status: "pending", // Món đang chờ
    itemsCount: 3,
    total: 750000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALJ3Otq5oOIvznqSPBZ5D3VH6zyXTGat5iSCMy4AWuBx9AAxHffkbDc7s3XGBo4uaV13joopjIqHsrOQJ-Rh3Jecu89amV-ecEdZCnqJ9OZAZ50B1TLq_jLQy0D4pAj9scyI4x23tfap3OigSgoCkCHdTrVeQQKea-P4b7pehS2VE0CaGWq0I26Y603gEvQvtql06xumG5ze9QeQtHxQ-rXzeYspnDQWCOtbKAqOo61igfWNHhK8J6kTHVcg8IuGoGEAa5Ls5jwP9G"
  },
  {
    id: 3,
    title: "Burger Bò, Khoai tây...",
    date: "10/07/2024 - 12:15",
    status: "cancelled",
    itemsCount: 2,
    total: 180000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbEwMSswpz7mZy_cKym8j_bGWJkuvBdB8aq0qzfauNGQ-rU273cu-zR6nXs2hJahUlVnTp0dyomtyWHj-unptRoKpyJjUUlYbuf6OX1lajbKWPHe1bCxSssAUmSmNObXJWzABKEwzcpZqXRcpWTZHPwVqy7HOlGRYEGBUboMcsNteXdo_Kscjl9hY0mvI5gh1YkUCj0q-X6NS5aJU4Ac-y9vmMmifvu6zeMCL7lcLCHx0VZf5Y_DD9X6mOHeo0MjRo9dxNP5e7XFzE"
  },
];

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all"); // all, completed, pending, cancelled
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm format tiền
  const formatMoney = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  // Hàm render badge trạng thái (Có dấu chấm tròn như thiết kế)
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 border border-green-200 dark:border-green-900/50 dark:bg-green-500/10 dark:text-green-400">
             <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></div>
             <span>Hoàn thành</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 border border-yellow-200 dark:border-yellow-900/50 dark:bg-yellow-500/10 dark:text-yellow-400">
            <div className="h-2 w-2 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
            <span>Đang chờ</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 border border-red-200 dark:border-red-900/50 dark:bg-red-500/10 dark:text-red-400">
             <div className="h-2 w-2 rounded-full bg-red-500 dark:bg-red-400"></div>
             <span>Đã hủy</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Logic lọc đơn hàng
  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesTab = activeTab === "all" ? true : order.status === activeTab;
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-slate-900 dark:text-white transition-colors duration-300">
      <div className="flex flex-1 justify-center py-5 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40">
        <div className="flex flex-col max-w-[960px] flex-1 w-full">
          
          {/* HEADER */}
          <header className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/menu')} // Quay lại Menu thay vì Home để luồng đi tự nhiên hơn
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h1 className="text-xl font-bold leading-tight">Lịch sử đặt món</h1>
            </div>
            <button 
              onClick={() => navigate('/cart')}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
          </header>

          {/* SEARCH & FILTER */}
          <div className="flex flex-col sm:flex-row gap-4 py-4">
            <div className="relative w-full sm:flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 pl-12 pr-4 text-base placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-primary focus:ring-primary text-slate-900 dark:text-white" 
                placeholder="Tìm đơn hàng theo tên món, ngày..." 
              />
            </div>
            <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium">
              <span className="material-symbols-outlined">filter_list</span>
              <span>Bộ lọc</span>
            </button>
          </div>

          {/* TABS SCROLLABLE */}
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {[
              { id: "all", label: "Tất cả" },
              { id: "pending", label: "Đang chờ" },
              { id: "completed", label: "Đã hoàn thành" },
              { id: "cancelled", label: "Đã hủy" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex h-9 shrink-0 items-center justify-center rounded-full px-5 text-sm font-medium transition-all whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-primary text-white shadow-md shadow-primary/30' 
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ORDERS LIST */}
          <div className="flex flex-col gap-4 py-4">
            
            {filteredOrders.length === 0 ? (
              // EMPTY STATE
              <div className="my-10 flex flex-col items-center justify-center gap-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center opacity-75">
                <div className="text-primary">
                  <span className="material-symbols-outlined text-6xl font-thin">search_off</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">Không tìm thấy đơn hàng</h3>
                  <p className="max-w-sm text-slate-500 dark:text-slate-400">
                    Không có đơn hàng nào khớp với tìm kiếm của bạn.
                  </p>
                </div>
              </div>
            ) : (
              // LIST ITEMS
              filteredOrders.map((order) => (
                <div key={order.id} className="p-0.5">
                  <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-slate-800 p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700/50 transition-all hover:shadow-md">
                    
                    {/* Header: Image, Info, Badge */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-900">
                          <div 
                            className="h-full w-full bg-cover bg-center bg-no-repeat" 
                            style={{ backgroundImage: `url("${order.image}")` }}
                          ></div>
                        </div>
                        <div className="flex flex-col">
                          <p className="text-base font-bold leading-tight text-slate-900 dark:text-white line-clamp-1">
                            {order.title}
                          </p>
                          <p className="pt-1 text-sm text-slate-500 dark:text-slate-400">
                            {order.date}
                          </p>
                        </div>
                      </div>
                      {/* Badge trạng thái */}
                      {renderStatusBadge(order.status)}
                    </div>

                    {/* Info Rows */}
                    <div className="flex items-center justify-between text-sm border-t border-slate-100 dark:border-slate-700 pt-3 mt-1">
                      <div className="flex gap-1 text-slate-600 dark:text-slate-400">
                         <span>Số lượng:</span>
                         <span className="font-medium text-slate-900 dark:text-white">{order.itemsCount} món</span>
                      </div>
                      <div className="flex gap-1 text-slate-600 dark:text-slate-400">
                        <span>Tổng cộng:</span>
                        <span className="font-semibold text-primary text-base">{formatMoney(order.total)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                      
                      <button  onClick={() => navigate(`/order/${order.id}`)} className="flex h-10 flex-1 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 px-4 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        Xem chi tiết
                      </button>

                      {/* Logic Nút Thứ 2 thay đổi theo trạng thái */}
                      {order.status === 'pending' ? (
                        // Đang chờ -> Hiện nút Hủy Đơn
                        <button 
                          onClick={() => alert("Xử lý hủy đơn...")}
                          className="flex h-10 flex-1 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-bold text-white hover:bg-red-700 transition-colors shadow-sm"
                        >
                          Hủy đơn
                        </button>
                      ) : (
                        // Hoàn thành/Hủy -> Hiện nút Đặt Lại
                        <button 
                          onClick={() => alert("Thêm lại vào giỏ...")}
                          className="flex h-10 flex-1 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-sky-600 transition-colors shadow-sm"
                        >
                          Đặt lại
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;