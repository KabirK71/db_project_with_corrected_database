import React from 'react';
import { useState } from "react";

export const SelectOrder = () => {
  
  var menuItems = [{FOOD_NAME: "Chicken Biryani", FOOD_PRICE: 500, DISCOUNT: 0}, {FOOD_NAME: "Chicken Pulao", FOOD_PRICE: 300, DISCOUNT: 0}, {FOOD_NAME: "Chicken Karahi", FOOD_PRICE: 400, DISCOUNT: 10}, {FOOD_NAME: "Chicken Tikka", FOOD_PRICE: 200, DISCOUNT: 0}, {FOOD_NAME: "Chicken Korma", FOOD_PRICE: 600, DISCOUNT: 0}, {FOOD_NAME: "Chicken Handi", FOOD_PRICE: 700, DISCOUNT: 10}, {FOOD_NAME: "Chicken Nihari", FOOD_PRICE: 800, DISCOUNT: 10}, {FOOD_NAME: "Chicken Qorma", FOOD_PRICE: 900, DISCOUNT: 0}, {FOOD_NAME: "Chicken Shashlik", FOOD_PRICE: 1000, DISCOUNT: 0}, {FOOD_NAME: "Chicken Kofta", FOOD_PRICE: 1100, DISCOUNT: 0}, {FOOD_NAME: "Chicken Kebab", FOOD_PRICE: 1200, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tandoori", FOOD_PRICE: 1300, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Masala", FOOD_PRICE: 1400, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Boti", FOOD_PRICE: 1500, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Karahi", FOOD_PRICE: 1600, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Handi", FOOD_PRICE: 1700, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Qorma", FOOD_PRICE: 1800, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Shashlik", FOOD_PRICE: 1900, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Kofta", FOOD_PRICE: 2000, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Kebab", FOOD_PRICE: 2100, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Tandoori", FOOD_PRICE: 2200, DISCOUNT: 0}, {FOOD_NAME: "Chicken Tikka Tikka Masala", FOOD_PRICE: 2300, DISCOUNT: 0},]

  const MenuList = menuItems.map((item, index) => (
      <div class="w-full space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0 px-2 pb-5 " key={index}>
        <div class="flex flex-col p-6 mx-auto text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
          <p href="" class="flex flex-row mb-4 text-md font-semibold">{item.FOOD_NAME}</p>       
          <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Rs. {item.FOOD_PRICE}</p>
          <button class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                Add to Cart
          </button>
        </div>
      </div>
  ));
  
  return (
    <section class="bg-white dark:bg-gray-900 justify-items-center py-4 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="flex flex-col lg:flex-row">
        <h2 class="mx-auto max-w-screen-md font-semibold mt-2 text-lg lg:mb-12">Place Your Order</h2> 
      </div>
      <div>{MenuList}</div>
    </section>
  )
};