import React from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from '../Pages/Homepage/Homepage';
import Shoppage from '../Pages/Shoppage/Shoppage';
import Productdetail from '../Pages/Productdetail/Productdetail';
import Shopingcard from '../Pages/Shopingcard/Shopingcard';
import Checkoutpage from '../Pages/Checkoutpage/Checkoutpage';
import Checkoutsuccess from '../Pages/Checkoutsuccess/Checkoutsuccess';
import LoginForm from '../Pages/LoginForm/LoginForm';
import Forgotpassword from '../Pages/Forgotpassword/Forgotpassword';
import Emailverification from '../Pages/Emailverification/Emailverification';
import Resetpassword from '../Pages/Resetpassword/Resetpassword';
import Faqs from '../Components/Faqs/Faqs';
import Aboutus from '../Components/Aboutus/Aboutus';
import Customerhelp from '../Components/Customerhelp/Customerhelp';
import Profile from '../Pages/Profile/Profile';
import Orderhistory from '../Pages/Orderhistory/Orderhistory';
import Orderdetail from '../Pages/Orderdetail/Orderdetail';
import Trackorder from '../Pages/Trackorder/Trackorder';
import ProtectedRoute from '../ProtectedRoute';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/verify-code" element={<Emailverification />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/customer-help" element={<Customerhelp />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />
        <Route path="/shop-page/:id" element={
          <ProtectedRoute>
            <Shoppage />
          </ProtectedRoute>
        } />
        <Route path="/product/:id" element={
          <ProtectedRoute>
            <Productdetail />
          </ProtectedRoute>
        } />
        <Route path="/shoping-card" element={
          <ProtectedRoute>
            <Shopingcard />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkoutpage />
          </ProtectedRoute>
        } />
        <Route path="/checkout-success" element={
          <ProtectedRoute>
            <Checkoutsuccess />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/order-history" element={
          <ProtectedRoute>
            <Orderhistory />
          </ProtectedRoute>
        } />
        <Route path="/order-detail" element={
          <ProtectedRoute>
            <Orderdetail />
          </ProtectedRoute>
        } />
        <Route path="/track-order" element={
          <ProtectedRoute>
            <Trackorder />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default AppRoutes;
