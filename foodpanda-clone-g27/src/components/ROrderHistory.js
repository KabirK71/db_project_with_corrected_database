// create a component that displays the order history of the customer
import { useState, useEffect } from "react";
import Axios from "axios";
import logo from "../assets/logo_svg.svg";
import { useNavigate } from "react-router-dom";
import e from "cors";
import axios from "axios";

export const ROrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();
  const rest_id = localStorage.getItem("id");

  useEffect(() => {
    console.log(rest_id);
    Axios.post("https://dastarkhwan-g27.herokuapp.com/restorderhistory", {
      id: rest_id,
    }).then((response) => {
      console.log(response.data);
      if (response.data.length > 0) {
        setOrderHistory(...orderHistory, response.data);
      }
    });
  }, []);

  const confirmOrder =(orderID)=>
  {
    Axios.post("https://dastarkhwan-g27.herokuapp.com/confirmorder", {
      id: rest_id,
      orderID: orderID,
      }).then((response) => {
        if (response.data.message === "Rider not free") {
          alert("No Rider Free")
        }
        else
        {
          

          
          alert("Order Confirmed")
          window.location.reload();
        }
      });
  }



  const orderList = orderHistory.map((item) => (
    <div class="space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0 px-2 pb-5 ">
      <button class="w-full flex flex-col p-6 mx-auto text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:bg-gray-50">
        <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Order Order Id: {item.ORDER_ID}</p>
        <p href="" class="mb-4 text-md font-semibold">
          {[item.FIRST_NAME, item.LAST_NAME].join(" ")}
        </p>
        <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Order Status: {item.STATUS_ORDER}</p>
        <button onClick={()=>{confirmOrder(item.ORDER_ID)}}> Confirm </button>

      </button>
    </div>
  ));

  return (
    <div className="OrderHistory">
      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a class="flex items-center">
              <img src={logo} class="mr-3 h-6 sm:h-9" alt="app logo" />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Dastarkhwan</span>
            </a>
            <div class="flex items-center lg:order-2"></div>
            <div class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0"></ul>
            </div>
          </div>
        </nav>
      </header>
      <h2 class="mx-auto max-w-screen-md text-center font-semibold mt-2 text-lg lg:mb-12">Order History</h2>
      <div>{orderList}</div>
    </div>
  );
};
