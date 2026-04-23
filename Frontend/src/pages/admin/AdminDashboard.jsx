import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../../components/admin/AdminSidebar';

const AdminDashBoard = () => {
  const navigate = useNavigate();

  const buttons = [
    { label: 'Manage Users', path: '/manageuser', color: 'bg-emerald-900' },
    { label: 'Products', path: '/products', color: 'bg-yellow-400' },
    { label: 'Orders', path: '/orders', color: 'bg-yellow-400' },
    { label: 'Sales', path: '/salespage', color: 'bg-yellow-400' },
  ];

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar on the left */}
      <AdminSideBar />

      {/* Main content on the right */}
      <div className="flex-1 flex flex-col items-center bg-white py-10 px-4 overflow-y-auto">
        <img src="/src/assets/admin/welcomeText.svg" className="w-full h-[200px]" alt="logo" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 w-full max-w-4xl">
          {buttons.map((btn, index) => (
            <div key={index} className="flex flex-col items-center space-y-3 w-full">
              <div
                onClick={() => navigate(btn.path)}
                className={`${btn.color} w-68 h-40 rounded-2xl cursor-pointer transition duration-300 hover:scale-105`}
              ></div>
              <p className="text-lg sm:text-xl md:text-2xl font-extrabold text-emerald-900 text-center">
                {btn.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
