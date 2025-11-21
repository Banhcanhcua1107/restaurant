import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import RoleSwitcher from './components/RoleSwitcher';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <BrowserRouter>
      
      {/* === KHU VỰC ĐIỀU KHIỂN GÓC TRÁI DƯỚI === */}
      <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-3">
        {/* Nút chuyển Role */}
        <RoleSwitcher />
        
        {/* Nút Dark Mode */}
        <ThemeToggle />
      </div>

      {/* Nội dung chính */}
      <AppRoutes />
      
    </BrowserRouter>
  );
}

export default App;