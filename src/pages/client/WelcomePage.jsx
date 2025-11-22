import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Nếu dùng useNavigate thay vì thẻ a

const WelcomePage = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark transition-colors duration-300">
      
      {/* ⚠️ CHÚ Ý: Đã XÓA nút <button onClick={toggleTheme}> cũ ở đây để tránh bị đè */}

      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 flex flex-1 justify-center py-5 sm:px-6 lg:px-8">
          <div className="layout-content-container flex flex-col w-full max-w-md flex-1">
            
            {/* Header */}
            <header className="flex justify-center py-8">
              <div className="flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-2">restaurant</span>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white transition-colors">
                  Table Flow
                </h1>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-col items-center justify-center">
              <div className="w-full text-center p-6 bg-white dark:bg-slate-850 rounded-xl shadow-lg transition-colors duration-300">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl transition-colors">
                    Chào mừng!
                  </h2>
                  <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 transition-colors">
                    Quý khách đang ở
                  </p>
                </div>

                <div className="mb-8">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Bàn số</span>
                  <p className="text-8xl font-black text-primary leading-none tracking-tighter mt-2">
                    12
                  </p>
                </div>

                {/* Chuyển thẻ a thành Link hoặc giữ nguyên thẻ a nếu chưa muốn tối ưu SPA */}
                <a 
                  href="/menu" 
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800"
                >
                  <span>Vào Menu</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </main>

            {/* Footer */}
            <footer className="py-8 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">
                © 2024 Ocean's Delight. All rights reserved.
              </p>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;