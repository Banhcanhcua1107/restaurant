import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dữ liệu giả lập trong giỏ hàng (Sau này dùng Context/Redux để lấy từ Menu qua)
const INITIAL_CART = [
  {
    id: 1,
    name: "Phở Bò Tái Lăn",
    price: 120000,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhyK2p3kdsf32w8CyCd1xkTPoy5sUkJ6aVGqCF9uP67DpJtUcdvZM3XmN0ytLHdTVhMp_w45KRIOCbjZpJsKBU9U5oNTQtY_mZEv_NJ7zmpXHa8PV79cfxCESGVIVxVw4GIVnqXW67kqi7C0H_BOtQ0JZuhmaCl3F6sd_Yyc9-B1L-WBIEYr0eG2QR0EGg3VHH0g8VtGMWqIRM_yvzx7PcG8Ea7dqOMBiMsmXjEZRpmFqDChXnFd8gKJ-UvDabGL3ycNIcQlowMJO4"
  },
  {
    id: 2,
    name: "Nem Chua Rán",
    price: 60000,
    quantity: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIeSVI524cRUGBT7FFXhC04EsP9hxWkRb4udkoct0RViCIF1TEANUAmB0pL7cJbSh3QNjr1beudGT9YlihtpeRn8x6F9NMlLBLR6GvvxvSvxd6NuGjyhCWam1Jw2RezT_8P8aTgnegspD5Qvh26tUPjYDnFgXh1rZp8nMxgFQp2wBPCRU5Q6HD9F2nQYGO5JDBza_M2_gM545YunpzjmGT_aO-jofkGn8XqTbsmiqtzOs__ApaIYi8aq3MsQPl1bPMoD-9sD4wyWXa"
  },
  {
    id: 3,
    name: "Trà Chanh",
    price: 25000,
    quantity: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7Qnop7Vsnd_UIjfIKXO08Kor3VSkepUfDYh-sZzBbRQZIMsB0Bg3OXet6gtWTGaG_E8v2vpW-iWQKwO86P0wWieRKXEgIFURQ-ZlhzrM2yIr1CSKudywWlS7Nk947OjZRegXJRW16VwfeJrFhaCsCrf2w9JUdcei5JgGnY9D098JAt_iMmiKVurOYcP3JV-d2ozKHjbT-gIBuK--6EVhI3rTgdjMMG8juE2DiQhJZiKynIgILKV2hZnLljnl9X1ySmxGFJohQ7iV9"
  }
];

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  // Hàm format tiền VND
  const formatCurrency = (value) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  // Xử lý tăng giảm số lượng
  const updateQuantity = (id, amount) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  // Xử lý xóa món
  const removeItem = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa món này?")) {
      setCartItems(items => items.filter(item => item.id !== id));
    }
  };

  // Tính tổng tiền
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen transition-colors duration-300">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center p-0 sm:p-5">
            
            {/* CONTAINER CHÍNH */}
            <div className="layout-content-container flex flex-col w-full max-w-2xl flex-1 bg-background-light dark:bg-background-dark sm:bg-white sm:dark:bg-slate-900 sm:rounded-xl sm:shadow-lg sm:border sm:border-slate-200 sm:dark:border-gray-800 transition-colors">
              
              {/* Header Sticky */}
              <header className="flex justify-between items-center gap-2 p-4 border-b border-slate-200 dark:border-gray-800 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 sm:bg-white/80 sm:dark:bg-slate-900/80 backdrop-blur-sm z-10 transition-colors">
                <button 
                  onClick={() => navigate(-1)} // Quay lại trang trước
                  className="p-2 text-slate-800 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold text-slate-900 dark:text-gray-50">Order của bạn</h1>
                <div className="w-10 h-10"></div> {/* Spacer để căn giữa title */}
              </header>

              {/* Danh sách món ăn */}
              <main className="flex-grow p-4 space-y-4">
                <div className="space-y-3">
                  
                  {cartItems.length === 0 ? (
                    <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                      Giỏ hàng trống trơn 😢
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex gap-4 p-4 rounded-lg bg-white dark:bg-gray-900/50 justify-between items-center shadow-sm border border-slate-100 dark:border-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {/* Ảnh món ăn (Background style như mẫu) */}
                          <div 
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 shrink-0" 
                            style={{ backgroundImage: `url("${item.image}")` }}
                          ></div>
                          
                          <div className="flex flex-col justify-center">
                            <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-slate-500 dark:text-gray-400 text-sm font-normal leading-normal">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                        </div>

                        {/* Nút Tăng/Giảm/Xóa */}
                        <div className="shrink-0 flex items-center gap-3">
                          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1}
                              className="text-xl font-medium leading-normal flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-gray-800 cursor-pointer hover:bg-slate-300 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-base font-bold leading-normal w-6 text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-xl font-medium leading-normal flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 dark:bg-gray-800 cursor-pointer hover:bg-slate-300 dark:hover:bg-gray-700 transition-colors"
                            >
                              +
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-slate-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}

                </div>

                {/* Phần ghi chú */}
                <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4 border border-slate-100 dark:border-gray-800">
                  <label className="text-base font-semibold text-slate-900 dark:text-white mb-2 block" htmlFor="order-notes">
                    Ghi chú
                  </label>
                  <textarea 
                    className="w-full rounded-md border-slate-300 dark:border-gray-700 bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-gray-200 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-gray-500 transition-colors" 
                    id="order-notes" 
                    placeholder="Thêm ghi chú cho nhà bếp... (ví dụ: ít cay, không hành)" 
                    rows="3"
                  ></textarea>
                </div>
              </main>

              {/* Footer Sticky (Tổng tiền) */}
              <footer className="p-4 mt-auto border-t border-slate-200 dark:border-gray-800 sticky bottom-0 bg-background-light/80 dark:bg-background-dark/80 sm:bg-white/80 sm:dark:bg-slate-900/80 backdrop-blur-sm z-10 transition-colors">
                <div className="space-y-4">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between items-center text-slate-600 dark:text-gray-300">
                      <span>Tạm tính ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} món)</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-900 dark:text-white font-bold text-lg">
                      <span>Tổng cộng</span>
                      <span className="text-primary">{formatCurrency(totalAmount)}</span>
                    </div>
                  </div>
                  <button  onClick={() => { navigate('/track'); }} className="w-full bg-primary hover:bg-blue-600 text-white font-bold text-base py-3 px-4 rounded-xl shadow-lg shadow-primary/30 transition-transform duration-200 active:scale-95">
                    Gửi Order
                  </button>
                </div>
              </footer>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;