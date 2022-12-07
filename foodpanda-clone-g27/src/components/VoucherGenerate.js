// make a component that will allow users to enter a voucher code and send it to the backend using Axios
import React, { useState } from "react";
import Axios from "axios";

export const VoucherGenerate = () => {
    const [voucher, setVoucher] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [deduct, setDeduct] = useState("");

    const generate = () => {
        Axios.post("http://localhost:5000/vouchergenerate", {
        voucher: voucher,
        restaurant: restaurant,
        deduct: deduct,
        }).then((response) => {
        console.log(response);
        });
    };

    return (
        <div className="generate" class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 bg-gray-50 dark:bg-gray-900">
        <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Generate Voucher</h1>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Voucher Code</label>
        <input
            type="text"
            name="voucher"
            placeholder="Voucher Code"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
            setVoucher(e.target.value);
            }}
        />
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Restaurant ID</label>
        <input
            type="email"
            name="email"
            placeholder="Email ID"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
            setRestaurant(e.target.value);
            }}
        />
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Percentage To Deduct</label>
        <input
            type="number"
            name="percentage"
            placeholder="Percentage to deduct"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
            setDeduct(e.target.value);
            }}
        />
        <button onClick={generate}
        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-7">Generate</button>
        </div>
        </div>
        </div>
    );
    }


    // there is a problem with this one guys. The restaurant is not supposed to know its own id. We will just have to take an email from them and get the rest_id from the backend using multiple queries shayad
    //bhai email hi li hai
    
