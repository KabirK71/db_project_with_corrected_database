import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/logo_svg.svg";

export const LandingPageCustomer = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [restaurant, setRestaurant] = useState("");

  useEffect(() => {
    Axios.post("http://localhost:5000/landingpageforcustomers").then((response) => {
      console.log(response);
      // console.log("rendered");
      setSearchResults(...searchResults, response.data);
      console.log("this is search results", searchResults);
    });
  }, []);

  // const reqGen = (restName)=>{
  //   console.log(restName);
  //   Axios.post("http://localhost:5000/landingpageforrestaurant",{
  //     restName : restName,
  //   }).then((response)=>{
  //     console.log(response)
  //   })
  // }

  const restList = searchResults.map((item) => (
    <div class="space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0 px-2 pb-5 ">
      <button class="w-full flex flex-col p-6 mx-auto text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:bg-gray-50">  
        <p href="" class="mb-4 text-md font-semibold">{item.REST_NAME}</p>       
        <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Cuisine: {item.CUISINES}</p>
        <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Delivery fee: {item.DELIVERY_FEE}</p>
        <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Discount: {item.DISCOUNT}%</p>
        <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Price Rating: {item.PRICE_RATING}</p>
      </button>
    </div>
  ));

  return (
    <div className="LandingPageForCustomers">
      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a class="flex items-center">
              <img src={logo} class="mr-3 h-6 sm:h-9" alt="app logo" />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Dastarkhwan</span>
            </a>
            <div class="flex items-center lg:order-2">
              <button
                href="#"
                class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log Out
              </button>
              <button class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Profile
              </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <button
                    clbuttonss="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                    Orders
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <h2 class="mx-auto max-w-screen-md text-center font-semibold mt-2 text-lg lg:mb-12">Restaurants Available Near You</h2>  
      <div>{restList}</div>
    </div>
  );
};


// {searchResults.map((obj) => {
//   return (
//     <div>
//       <h1>{obj}</h1>
//     </div>
//   );
// })}


// onClick={()=>{reqGen(item.REST_NAME)}}>