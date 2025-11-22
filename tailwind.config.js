/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === MÀU CŨ (Cho phía Khách hàng) ===
        primary: {
          DEFAULT: "#0ea5e9", // sky-500 (Màu chủ đạo toàn app)
          600: "#0284c7"      // sky-600
        },
        "background-light": "#f0f9ff", // Nền sáng cho khách
        "background-dark": "#0c1429",  // Nền tối cho khách
        "slate-850": "#16223b",

        // === MÀU MỚI THÊM (Cho phía Bếp) ===
        // Nền bếp cần màu trung tính hơn để đỡ mỏi mắt
        "kitchen-bg-light": "#F7FAFC", 
        "kitchen-bg-dark": "#12181F", 
        "surface-dark": "#1A222C",     // Màu nền thẻ card khi ở Dark mode bếp

        // Màu trạng thái đơn hàng (Quan trọng)
        "status-new": "#EF6C00",       // Cam đậm (Đơn mới)
        "status-progress": "#FFB300",  // Vàng nghệ (Đang làm)
        "status-completed": "#4CAF50", // Xanh lá (Hoàn thành)
      },
      fontFamily: {
        "display": ["Be Vietnam Pro", "sans-serif"], // Font chính
        "body": ["Work Sans", "sans-serif"]          // Font phụ cho bếp (nếu cần số liệu rõ)
      },
    },
  },
  plugins: [],
}