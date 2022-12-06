// import React, {useState} from 'react';
// import Axios from 'axios';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {Login} from "./components/Login"
import { Signup } from './components/Signup';
import { SelectUser } from './components/SelectUser';
import { Search } from './components/Search';
import { DetailChange } from './components/DetailChange';  
import { AddressChange } from './components/AddressChange';
import { LandingPageCustomer } from './components/LandingPageCustomer';
import { DisplayOrdersRestaurant } from './components/DisplayOrdersRestaurant'
import { COrderHistory } from './components/COrderHistory';
import { VoucherGenerate } from './components/VoucherGenerate';
import { RestaurantSignUp } from './components/RestaurantSignup';


import Welcome from './components/Welcome';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/updatepassword" element={<DetailChange />} />
        <Route path="/addresschange" element={<AddressChange />} />
        <Route path="/selectuser" element={<SelectUser />} />
        <Route path="/landingpagecustomer" element={<LandingPageCustomer />} />
        <Route path="/displayordersrestaurant" element={<DisplayOrdersRestaurant />} />
        <Route path="/customerorderhistory" element={<COrderHistory />} />
        <Route path="/vouchergenerate" element={<VoucherGenerate />} />
        <Route path="/restsignup" element={<RestaurantSignUp />} />
      </Routes>
    </Router>
  );
}
