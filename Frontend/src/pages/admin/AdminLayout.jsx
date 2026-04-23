// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../../components/admin/AdminSidebar';

const AdminLayout = () => (
  <div className="flex h-screen">
    <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
      <Outlet /> {/* Nested page content goes here */}
    </div>
  </div>
);

export default AdminLayout;
