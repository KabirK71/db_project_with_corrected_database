// make a landing page for restaurants that will display their menu
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_svg.svg";
import { FaTrashAlt, FaEdit } from "react-icons/fa"

export const LandingPageRestaurant = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [restaurant, setRestaurant] = useState("");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
    localStorage.clear();
  };

  const AddMenu = () => {
    navigate("/addmenu");
  };

  const DeleteMenu = () => {
    navigate("/deletemenu");  
  };

  useEffect(() => {
    Axios.post("http://localhost:5000/landingpageforrestaurant", {
      id: id,
    }).then((response) => {
    console.log(response);  
    setSearchResults(...searchResults, response.data);
    });
  }, []);

  // var menuItems = [{FOOD_NAME: "Chicken Biryani", FOOD_PRICE: 500, DISCOUNT: 0}, {FOOD_NAME: "Chicken Pulao", FOOD_PRICE: 300, DISCOUNT: 0}, {FOOD_NAME: "Chicken Karahi", FOOD_PRICE: 400, DISCOUNT: 10}, {FOOD_NAME: "Chicken Tikka", FOOD_PRICE: 200, DISCOUNT: 0}, {FOOD_NAME: "Chicken Korma", FOOD_PRICE: 600, DISCOUNT: 0}, {FOOD_NAME: "Chicken Handi", FOOD_PRICE: 700, DISCOUNT: 10}, {FOOD_NAME: "Chicken Nihari", FOOD_PRICE: 800, DISCOUNT: 10}, {FOOD_NAME: "Chicken Qorma", FOOD_PRICE: 900, DISCOUNT: 0}, {FOOD_NAME: "Chicken Shashlik", FOOD_PRICE: 1000, DISCOUNT: 0}, {FOOD_NAME: "Chicken Kofta", FOOD_PRICE: 1100, DISCOUNT: 0}, {FOOD_NAME: "Chicken Kebab", FOOD_PRICE: 1200, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tandoori", FOOD_PRICE: 1300, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Masala", FOOD_PRICE: 1400, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Boti", FOOD_PRICE: 1500, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Karahi", FOOD_PRICE: 1600, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Handi", FOOD_PRICE: 1700, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Qorma", FOOD_PRICE: 1800, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Shashlik", FOOD_PRICE: 1900, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Kofta", FOOD_PRICE: 2000, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Kebab", FOOD_PRICE: 2100, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Tandoori", FOOD_PRICE: 2200, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Tikka Masala", FOOD_PRICE: 2300, DISCOUNT: 0},]

  const restList = searchResults.map((item, index) => (
      <div class="space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0 px-2 pb-5 " key={index}>
        <div class="w-full flex flex-col p-6 mx-auto text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <p href="" class="flex flex-row mb-4 text-md font-semibold">{item.FOOD_NAME}</p>       
          <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Rs: {item.FOOD_PRICE}</p>
          <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Discount: {item.DISCOUNT}%</p>
        </div>
      </div>
  ));

  return (
    <div className="LandingPageForCustomers" class="bg-white dark:bg-gray-900 ">
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
                onClick={logout}
              >
                Log Out
              </button>
              <button class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" onClick={AddMenu}>
                Add Menu
              </button>
              <button class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" onClick={DeleteMenu}>
                Delete Menu
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
      <section class="bg-white dark:bg-gray-900 justify-items-center py-4 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="flex flex-col lg:flex-row">
            <h2 class="mx-auto max-w-screen-md font-semibold mt-2 text-lg lg:mb-12">Menu</h2> 
          </div>
          <div>{restList}</div>
      </section>

    </div>
  );
};