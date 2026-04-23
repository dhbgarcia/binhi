import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'; // local import
import ManageSection from '../../components/admin/ManageSection.jsx'; // adjust path too

const ManageUserPage = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <ManageSection />
    </div>
  );
};

export default ManageUserPage;
