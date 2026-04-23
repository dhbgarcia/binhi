import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/admin-dashboard" },
    { label: "Manage Users", path: "/manageuser" },
    { label: "Products", path: "/products" },
    { label: "Orders", path: "/orders" },
    { label: "Sales", path: "/salespage" },
  ];

  return (
    <div className="bg-white w-80 h-screen flex flex-col py-10 px-4 space-y-4 items-center">
      {/* Logo Section */}
      <div className="w-full h-[10px] flex flex-row m-1  items-center relative -bottom-[10px] -right-[5  px]">
        <img
          src="/src/assets/logo.png"
          className="w-[100px] h-[100px] -bottom-[10px] relative "
          alt="logo"
        />
        <img
          src="/src/assets/admin/binhi.svg"
          className="w-[200px] h-[200px] relative  "
          alt="text"
        />
      </div>

      {/* Admin Tag */}
      <div className=" h-[100px] w-full items-center">
        <p className="font-bold text-2xl text-center relative -bottom-[20px] py-5">
          (ADMIN)
        </p>
      </div>

      {/* Menu Items */}
      <div className="w-full space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`text-2xl cursor-pointer px-4 py-2 w-full text-center rounded transition duration-200
                ${
                  isActive
                    ? "bg-emerald-900 text-white font-semibold"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
            >
              {item.label}
            </div>
          );
        })}
        <div
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          className="text-2xl cursor-pointer px-4 py-2 w-full text-center rounded transition duration-200
            hover:bg-gray-200 text-gray-700"
        >
          Log Out
        </div>
      </div>

      {/* Admin Icon */}
      <div className="mt-auto">
        <img
          src="/src/assets/admin/AdminLogo.png"
          className="w-[500x] h-[300px]"
          alt="admin-logo"
        />
      </div>
    </div>
  );
};

export default AdminSideBar;
