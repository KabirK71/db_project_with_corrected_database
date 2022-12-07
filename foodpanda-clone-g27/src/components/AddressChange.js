// make a component that will allow users to change their address
import React, { useState } from "react";
import Axios from "axios";

export const AddressChange = () => {
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [building, setBuilding] = useState("");
    const [street, SetStreet] = useState("");
    const [updateStatus, setUpdateStatus] = useState([]);

    const cust_id = localStorage.getItem("id");
    
    async function change (e) {
        e.preventDefault();
        Axios.post("http://localhost:5000/addresschange", {
        // cust_id: cust_id,
        email: email,
        city: city,
        area: area,
        building: building,
        street: street,
        }).then((response) => {
        // console.log(response);
        if(response.data.message === "Incorrect Values"){
          alert("Incorrect Values Entered");
        }
        else {
          // console.log(response.data.message);
          setUpdateStatus([response.data.message]);
          alert("Address Updated")
        }
        });
    };
    return (
      <div className="change" class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 bg-gray-50 dark:bg-gray-900">
        <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Change Address</h1>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <form class="p-6 space-y-4 md:space-y-6 sm:p-8" onSubmit={change}>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Adress</label>
            <input
              type="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="abc@xyz.com"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
            <input
              type="text"
              name="city"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="City"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Area</label>
            <input
              type="text"
              name="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Area"
              onChange={(e) => {
                setArea(e.target.value);
              }}
            />
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Building</label>
            <input
              type="text"
              name="building"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Building"
              onChange={(e) => {
                setBuilding(e.target.value);
              }}
            />
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
            <input
              type="text"
              name="street"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Street"
              onChange={(e) => {
                SetStreet(e.target.value);
              }}
            />
            <button
  
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-7"
            >
              Change
            </button>
          </form>
        </div>
      </div>
    );




    // return (
    //     <div className="change">
    //     <label>Email Adress</label>
    //     <input
    //         type="email"
    //         name="email"
    //         placeholder="Email Address"
    //         onChange={(e) => {
    //         setEmail(e.target.value);
    //         }}
    //     />

    //     <label>City</label>
    //     <input
    //         type="text"
    //         name="city"
    //         placeholder="City"
    //         onChange={(e) => {
    //         setCity(e.target.value);
    //         }}
    //     />
    //     <label>Area</label>
    //     <input
    //         type="text"
    //         name="area"
    //         placeholder="Area"
    //         onChange={(e) => {
    //         setArea(e.target.value);
    //         }}
    //     />
    //     <label>Building</label>
    //     <input
    //         type="text"
    //         name="building"
    //         placeholder="Building"
    //         onChange={(e) => {
    //         setBuilding(e.target.value);
    //         }}
    //     />
    //     <label>Street</label>
    //     <input
    //         type="text"
    //         name="street"
    //         placeholder="Street"
    //         onChange={(e) => {
    //         SetStreet(e.target.value);
    //         }}
    //     />
    //     <button onClick={change}>Change</button>
    //     </div>
    // );
    }