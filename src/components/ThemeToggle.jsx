import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    // Bỏ "fixed top...", chỉ giữ lại button
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative flex h-9 w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 shadow-md border border-slate-200 dark:border-slate-600
        ${darkMode 
          ? 'bg-slate-700' 
          : 'bg-sky-50' // Light: Nền xanh nhạt cực nhẹ
        }
      `}
      title={darkMode ? "Bật chế độ sáng" : "Bật chế độ tối"}
    >
      {/* Knob di chuyển */}
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-all duration-300 transform bg-white
          ${darkMode 
            ? 'translate-x-7 text-primary'  // Dark: Icon màu xanh Primary
            : 'translate-x-0 text-sky-500'  // Light: Icon màu xanh Sky (theo yêu cầu)
          }
        `}
      >
        <span className="material-symbols-outlined text-[18px] font-bold">
          {darkMode ? 'dark_mode' : 'light_mode'}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;