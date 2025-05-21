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

const AppRoutes = () => {
  return (
    <div>
     <Routes>
     
          <Route path="/" element={<Homepage />} />
          <Route path="/shop-page/:id" element={<Shoppage />} />
          <Route path="/product/:id" element={<Productdetail />} />
          <Route path="/shoping-card" element={<Shopingcard />} />
          <Route path="/checkout" element={<Checkoutpage />} />
          <Route path="/checkout-success" element={<Checkoutsuccess />} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/forgot-password" element={<Forgotpassword/>} />
          <Route path="/verify-code" element={<Emailverification/>} />
          <Route path="/reset-password" element={<Resetpassword/>} />
          <Route path="/faqs" element={<Faqs/>} />
          <Route path="/about-us" element={<Aboutus/>} />
          <Route path="/customer-help" element={<Customerhelp/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/order-history" element={<Orderhistory/>} />
          <Route path="/order-detail" element={<Orderdetail />} />
          <Route path="/track-order" element={<Trackorder />} />


          </Routes>
    </div>
  )
}

export default AppRoutes;
