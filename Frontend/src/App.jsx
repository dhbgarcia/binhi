import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/user/Sidebar.jsx';
// import ProfileSection from './components/user/ProfileSection.jsx';
import SignUpPage from './pages/auth/signup.jsx';
import SignInPage from './pages/auth/signin.jsx';
import ManageUserPage from './pages/admin/ManageUsersPage.jsx';
import ProductsPage from './pages/admin/ProductsPage.jsx';
import SalesPage from './pages/admin/SalesPage.jsx';
import ViewProductPage from './pages/admin/ViewProductPage.jsx';
import BaseDashboardPage from './pages/user/BaseDashboard.jsx';
import AdminDashBoard from './pages/admin/AdminDashboard.jsx';
import { useUser } from './context/UserContext.jsx';
// import OrdersPage from './pages/user/ordersPage.jsx';
import { jwtDecode } from 'jwt-decode'
import AddProductPage from './pages/admin/AddProductPage.jsx'; 
import OrdersPage from './pages/admin/OrdersPage.jsx';

const ProtectedRoute = ({ children, allowedType }) => {
  const { setToken, isTokenValid, isTokenSet, setDecodedToken, setErrorMessage, setCenterMessage, decodedToken } = useUser();
  const [isVerified, setIsVerified] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsVerified(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (!isTokenSet) {
        setToken(token);
      }
      setDecodedToken(decoded);

      if (isTokenValid() && decoded.userType === allowedType) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    } catch (e) {
      setIsVerified(false);
    }
  }, []);

  if (isVerified === null) {
    return <div className=' flex justify-center items-center bg-primaryGreen text-primaryYellow min-w-screen min-h-screen text-7xl font-bold'><p>Loading...</p></div>;
  }

  if (!isVerified) {
    return <Navigate to="/signin" replace />;
  }
  // setCenterMessage('Welcome back, ' + jwtDecode(localStorage.getItem('token')).username);
  return children;
};

const App = () => {
  const { NotificationComponent, CenterNotificationComponent } = useUser();
  const token = localStorage.getItem('token');

  return (
    <div className='font-poppins-bold'>
      <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* User Routes */}
              
              <Route path="/shop" element={
                <ProtectedRoute allowedType="User">
                  <BaseDashboardPage />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
                
               <Route path="/orders" element ={
                <ProtectedRoute allowedType="Admin">
                  <OrdersPage></OrdersPage>
                </ProtectedRoute>
               }>

               </Route> 

             <Route path="/view-product/:id" element={<ViewProductPage />} />


              <Route path="/admin-dashboard" element ={
                <ProtectedRoute allowedType="Admin">
                  <AdminDashBoard></AdminDashBoard>
                </ProtectedRoute>
              } >

              </Route>
              <Route path="/manageuser" element={
                <ProtectedRoute allowedType="Admin">
                  <ManageUserPage />
                </ProtectedRoute>
              } />

              <Route path="/products" element={
                <ProtectedRoute allowedType="Admin">
                  <ProductsPage />
                </ProtectedRoute>
              } />

              <Route path="/view-product" element={
                <ProtectedRoute allowedType="Admin">
                  <ViewProductPage />
                </ProtectedRoute>
              } />
                

                <Route path="/add-product" element={
                <ProtectedRoute allowedType="Admin">
                  <AddProductPage />
                </ProtectedRoute>
              } />


              <Route path="/salespage" element={
                
                <ProtectedRoute allowedType="Admin">
                  <SalesPage />
                </ProtectedRoute>
              } />

              {/* Default fallback */}
              <Route path="*" element={<Navigate to="/signin" replace />} />
              
            </Routes>
      </Router>
      <NotificationComponent />
      <CenterNotificationComponent />
    </div>
  );
};

export default App;
