// import React, {useState} from 'react';
// import Axios from 'axios';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {Login} from "./components/Login"
import { SignUpCust } from './components/SignUpCust';
import { SignUpRest } from './components/SignUpRest';
import { SignUpRider } from './components/SignUpRider';
import { SelectUser } from './components/SelectUser';
import { Search } from './components/Search';
import { DetailChange } from './components/DetailChange';  
import { AddressChange } from './components/AddressChange';
import { LandingPageCustomer } from './components/LandingPageCustomer';
import { DisplayOrdersRestaurant } from './components/DisplayOrdersRestaurant'
import { COrderHistory } from './components/COrderHistory';
import { VoucherGenerate } from './components/VoucherGenerate';
import { AddMenu } from './components/AddMenu'
import { DeleteMenu } from './components/DeleteMenu';
import { LandingPageRestaurant } from './components/LandingPageRestaurant';
import { LandingPageRider } from './components/LandingPageRider';
import { Help } from './components/Help';
// import { LandingPageForRestaurant } from './components/LandingPageForRestaurants';
import Welcome from './components/Welcome';
import { CustomerCart } from './components/CustomerCart';
import { DisplayMenuForCustomer } from './components/DisplayMenuForCustomer';
import { ROrderHistory } from './components/ROrderHistory';
// import {LandingPageRider} from './components/LandingPageRider';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signupcust" element={<SignUpCust />} />
        <Route path="/signuprest" element={<SignUpRest />} />
        <Route path="/signuprider" element={<SignUpRider/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/updatepassword" element={<DetailChange />} />
        <Route path="/addresschange" element={<AddressChange />} />
        <Route path="/selectuser" element={<SelectUser />} />
        <Route path="/landingpagecustomer" element={<LandingPageCustomer />} />
        <Route path="/displayordersrestaurant" element={<DisplayOrdersRestaurant />} />
        <Route path="/customerorderhistory" element={<COrderHistory />} />
        <Route path="/vouchergenerate" element={<VoucherGenerate />} />
        <Route path="/addmenu" element={<AddMenu />} />
        <Route path="/deletemenu" element={<DeleteMenu />} />
        <Route path="/detailchange" element={<DetailChange />} />
        <Route path="/landingpageforrestaurant" element={<LandingPageRestaurant />} />
        <Route path="/landingpageforrider" element={<LandingPageRider />} />
        <Route path="/help" element={<Help />} />
        <Route path="/displaymenuforcustomer" element= {<DisplayMenuForCustomer/>} />
        <Route path="/customercart" element= {<CustomerCart/>} />
        <Route path="/restorderhistory" element= {<ROrderHistory/>} />
        {/* <Route path="/landingpageforrider" element= {<LandingPageRider/>} /> */}

      </Routes>
    </Router>
  );
}
