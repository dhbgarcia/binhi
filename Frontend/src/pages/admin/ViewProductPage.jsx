import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar.jsx';
import ProductSection from '../../components/admin/ProductSection.jsx'; // Adjust if needed
import ViewProduct from '../../components/admin/ViewProduct.jsx';

const ViewProductPage = () => {
  return (
    <div className="flex w-screen">
      <AdminSidebar />
      <ViewProduct />
    </div>
  );
};
export default ViewProductPage;
