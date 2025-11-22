import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Dữ liệu giả lập
const MOCK_ORDER_DETAIL = {
  id: "12345",
  date: "15/07/2024 - 19:30",
  status: "completed", 
  deliveryAddress: "123 Đường ABC, Phường X, Quận Y, TP. Z",
  paymentMethod: "Tiền mặt",
  items: [
    {
      id: 1,
      name: "Pizza Hải sản",
      quantity: 1,
      price: 200000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtxac9SC82s_YkqvnizGZnpep5nJB8vSpg5HHbdhguVMK5B8fh21MxzhXe2byFmSQMt2murRsEYpotalPD3pvtzN5Upi8LZp_8lhDlO-4fZ2w3RJF0j39Oca4hTvZBHfw_Cu5XUoLdrjLLRMYA5jAP9PY7x0OIe3DNAsnK0HjNfuRxd2-7zrXuomN_m7f8AeVgNDz143DeQ5dDzq8-MgdW4yAaqZYwBA_9JcGduGbZlu78nsci2oXL2RBroqvRrlzkVH33aQoBpPau"
    },
    {
      id: 2,
      name: "Mì Ý Sốt Bò Bằm",
      quantity: 1,
      price: 150000,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbEwMSswpz7mZy_cKym8j_bGWJkuvBdB8aq0qzfauNGQ-rU273cu-zR6nXs2hJahUlVnTp0dyomtyWHj-unptRoKpyJjUUlYbuf6OX1lajbKWPHe1bCxSssAUmSmNObXJWzABKEwzcpZqXRcpWTZHPwVqy7HOlGRYEGBUboMcsNteXdo_Kscjl9hY0mvI5gh1YkUCj0q-X6NS5aJU4Ac-y9vmMmifvu6zeMCL7lcLCHx0VZf5Y_DD9X6mOHeo0MjRo9dxNP5e7XFzE"
    }
  ],
  subtotal: 350000,
  shippingFee: 20000,
  discount: 20000,
  total: 350000
};

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false); // State quản lý Modal

  useEffect(() => {
    setOrder(MOCK_ORDER_DETAIL);
  }, [id]);

  const formatMoney = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  // Hàm xử lý khi xác nhận đặt lại
  const handleConfirmReorder = () => {
    // Giả lập logic thêm vào giỏ hàng
    setIsReorderModalOpen(false);
    navigate('/cart');
  };

  if (!order) return <div className="p-10 text-center">Đang tải...</div>;

  return (
    <div className="w-full flex-col font-display transition-colors duration-300">
      <div className="flex flex-1 justify-center py-5 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40">
        <div className="flex flex-col max-w-[960px] flex-1 w-full">
          
          {/* HEADER */}
          <header className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-10 border-b border-slate-200 dark:border-[#1E293B] bg-slate-50/95 dark:bg-[#0B1426]/95 sticky top-0 z-10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)} 
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-[#334155] transition-colors"
              >
                <span className="material-symbols-outlined text-slate-700 dark:text-white">arrow_back</span>
              </button>
              <h1 className="text-xl font-bold leading-tight">Chi tiết đơn hàng</h1>
            </div>
            <button 
              onClick={() => navigate('/cart')}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-[#334155] transition-colors"
            >
              <span className="material-symbols-outlined text-slate-700 dark:text-white">shopping_cart</span>
            </button>
          </header>

          <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
            
            {/* INFO */}
            <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1E293B] p-4 sm:p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700/50">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col">
                  <p className="text-lg font-bold">Đơn hàng #{order.id}</p>
                  <p className="text-sm text-slate-500 dark:text-[#94A3B8]">{order.date}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 border border-green-200 dark:border-green-900/50 dark:bg-green-500/10 dark:text-green-400">
                  <div className="h-2 w-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                  <span>Hoàn thành</span>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-[#334155]"></div>
              <div className="flex flex-col gap-3 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-slate-500 dark:text-[#94A3B8]">Địa chỉ giao hàng:</span>
                  <span className="font-medium text-right sm:max-w-[60%]">{order.deliveryAddress}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-slate-500 dark:text-[#94A3B8]">Phương thức thanh toán:</span>
                  <span className="font-medium text-right">{order.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* ITEMS */}
            <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1E293B] p-4 sm:p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700/50">
              <h2 className="text-lg font-bold">Các món đã đặt</h2>
              <div className="flex flex-col gap-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-[#0B1426]">
                      <div className="h-full w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("${item.image}")` }}></div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="font-semibold line-clamp-1">{item.name}</p>
                      <p className="text-sm text-slate-500 dark:text-[#94A3B8]">Số lượng: {item.quantity}</p>
                    </div>
                    <p className="font-semibold whitespace-nowrap">{formatMoney(item.price)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1E293B] p-4 sm:p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700/50">
              <h2 className="text-lg font-bold">Tóm tắt thanh toán</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-[#94A3B8]">Tạm tính</span>
                  <span>{formatMoney(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-[#94A3B8]">Phí giao hàng</span>
                  <span>{formatMoney(order.shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-[#94A3B8]">Giảm giá</span>
                  <span className="text-green-600 dark:text-green-400">-{formatMoney(order.discount)}</span>
                </div>
                <div className="my-2 border-t border-slate-100 dark:border-[#334155]"></div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Tổng cộng</span>
                  <span className="font-bold text-primary">{formatMoney(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Button Mở Modal */}
            <div className="flex justify-center pt-4 pb-10">
              <button 
                onClick={() => setIsReorderModalOpen(true)}
                className="flex h-12 w-full max-w-xs items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20 active:scale-95 transform"
              >
                <span className="material-symbols-outlined text-lg">replay</span>
                <span>Đặt lại</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* === MODAL XÁC NHẬN (TOAST/DIALOG) === */}
      {isReorderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-white dark:bg-[#1E293B] p-6 text-center shadow-2xl animate-scale-up">
            
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-[#334155] text-primary">
                <span className="material-symbols-outlined !text-3xl">replay</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Xác nhận đặt lại đơn hàng?
              </h2>
              <p className="text-sm text-slate-500 dark:text-[#94A3B8]">
                Tất cả các món trong đơn hàng này sẽ được thêm vào giỏ hàng của bạn.
              </p>
            </div>

            <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row">
              <button 
                onClick={() => setIsReorderModalOpen(false)}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-slate-100 dark:bg-[#334155] px-4 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <span>Hủy</span>
              </button>
              
              <button 
                onClick={handleConfirmReorder}
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-primary px-4 text-sm font-bold text-white hover:bg-blue-600 transition-colors"
              >
                <span>Xác nhận</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default OrderDetailPage;