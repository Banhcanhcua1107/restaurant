import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Danh sách món ăn giả lập
const MENU_ITEMS = [
  {
    id: 1,
    name: "Phở Bò Tái Lăn",
    desc: "Nước dùng đậm đà, thịt bò mềm ngọt, bánh phở dai ngon.",
    price: "65.000đ",
    image: "https://placehold.co/600x400",
  },
  {
    id: 2,
    name: "Bún Chả Hà Nội",
    desc: "Chả nướng thơm lừng, nước mắm chua ngọt, ăn kèm bún và rau sống tươi mát.",
    price: "55.000đ",
    image: "https://placehold.co/600x400",
  },
  {
    id: 3,
    name: "Nem Rán Truyền Thống",
    desc: "Vỏ giòn rụm, nhân thịt mộc nhĩ đậm đà, món khai vị không thể thiếu.",
    price: "45.000đ",
    image: "https://placehold.co/600x400",
  },
  {
    id: 4,
    name: "Salad Cá Hồi",
    desc: "Cá hồi tươi, rau củ giòn mát hòa quyện cùng sốt dầu giấm chua dịu.",
    price: "85.000đ",
    image: "https://placehold.co/600x400",
  },
  {
    id: 5,
    name: "Bò Bít Tết Sốt Tiêu",
    desc: "Thịt bò mềm mọng, sốt tiêu đen cay nồng, ăn kèm khoai tây chiên giòn.",
    price: "150.000đ",
    image: "https://placehold.co/600x400", 
  },
  {
    id: 6,
    name: "Chè Khúc Bạch",
    desc: "Thanh mát, ngọt dịu với khúc bạch mềm mịn, nhãn tươi và hạnh nhân giòn tan.",
    price: "35.000đ",
    image: "https://placehold.co/600x400",
  }
];

const CATEGORIES = ["Tất cả", "Món khai vị", "Món chính", "Món nướng", "Tráng miệng", "Đồ uống", "Món đặc biệt"];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 font-display transition-colors duration-300">
      
      {/* HEADER - Sticky Top */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="h-8 w-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight hidden sm:block">TableFlow</h2>
        </div>

        {/* --- CỤM NÚT BÊN PHẢI --- */}
        <div className="flex items-center gap-3">
          
          {/* MỚI: Nút Lịch sử đặt món */}
          <button 
            onClick={() => navigate('/history')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            title="Lịch sử đặt món"
          >
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">receipt_long</span>
          </button>

          {/* Nút Giỏ hàng */}
          <button 
            onClick={() => navigate('/cart')} 
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
            title="Giỏ hàng"
          >
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-200">shopping_bag</span>
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
              3
            </div>
          </button>

        </div>
      </header>

      <main className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        {/* Tiêu đề trang */}
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Thực Đơn</h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">Khám phá những món ăn đặc sắc nhất của chúng tôi</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* SIDEBAR (Danh mục) - Ẩn trên mobile, Hiện trên Desktop */}
          <aside className="hidden md:col-span-3 md:block">
            <div className="sticky top-24 flex flex-col gap-4 rounded-xl p-4 bg-white dark:bg-slate-850 shadow-sm ring-1 ring-gray-200 dark:ring-gray-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Danh mục</h3>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-all
                      ${activeCategory === cat 
                        ? 'bg-primary/10 text-primary ring-1 ring-primary/20 dark:bg-primary/20' 
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* NỘI DUNG CHÍNH */}
          <div className="md:col-span-9 flex flex-col gap-6">
            
            {/* Thanh tìm kiếm & Bộ lọc Mobile */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-grow group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Tìm kiếm món ăn..." 
                  className="block w-full rounded-xl border-none bg-white py-3 pl-11 pr-4 shadow-sm ring-1 ring-gray-200 placeholder:text-slate-400 focus:ring-2 focus:ring-primary dark:bg-slate-800 dark:ring-gray-700 dark:text-white sm:text-sm sm:leading-6"
                />
              </div>
              {/* Nút bộ lọc (Chỉ hiện trên mobile) */}
              <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-white border border-slate-200 px-4 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-white md:hidden">
                <span className="material-symbols-outlined text-base">filter_list</span>
                <span>Bộ lọc</span>
              </button>
            </div>

            {/* Danh sách món ăn (GRID) */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {MENU_ITEMS.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-100 transition-transform hover:-translate-y-1 hover:shadow-xl dark:bg-slate-850 dark:ring-slate-800"
                >
                  {/* Hình ảnh món ăn */}
                  <div className="aspect-video w-full overflow-hidden bg-gray-200">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
                      onError={(e) => { e.target.src = "https://placehold.co/600x400?text=No+Image"; }} 
                    />
                  </div>

                  {/* Thông tin món */}
                  <div className="flex flex-grow flex-col p-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h3>
                    <p className="mt-2 flex-grow text-sm text-slate-500 line-clamp-2 dark:text-slate-400">
                      {item.desc}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">{item.price}</p>
                      <button className="group flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-sky-600 focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                        <span>Thêm</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>

      {/* Floating Action Button (Mobile Cart) - Góc dưới phải */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button onClick={() => navigate('/cart')} className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-sky-500/30 transition-transform hover:scale-105 active:scale-95">
          <span className="material-symbols-outlined text-2xl text-white">shopping_bag</span>
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 ring-2 ring-white text-xs font-bold text-white">
            3
          </span>
        </button>
      </div>

    </div>
  );
};

export default MenuPage;