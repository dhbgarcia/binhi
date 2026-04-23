import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'; // local import
import ManageSection from '../../components/admin/ManageSection.jsx'; // adjust path too
import ProductContainer from '../../components/admin/ProductContainer.jsx';
import ProductSection from '../../components/admin/ProductSection.jsx';

const ProductsPage = () => {
  return (
    <div className='flex h-screen'>
    <AdminSidebar></AdminSidebar>
        <ProductSection></ProductSection>
    </div>   
  );
}
export default ProductsPage;
