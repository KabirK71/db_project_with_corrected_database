// create a component that will be used to add a new menu item

import React, { useState } from "react";
import Axios from "axios";

export const AddMenu = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  // const [result, setResult] = useState([]);
  const id = localStorage.getItem("id");

  const Add = () => {
    Axios.post("https://dastarkhwan-g27.herokuapp.com/addmenu", {
      name: name,
      id: id,
      price: price,
      description: description,
      discount: discount,

    }).then((response) => {
      if (response.data.message === "Item Not Inserted") {
        alert("Item Not Inserted");
      } else {
        alert("Item Inserted");
      }
    });
  };

  return (
    <div className="addmenu" class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 bg-gray-50 dark:bg-gray-900">
      <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Add Menu Item</h1>
      <form class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" onSubmit={Add}>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Menu Item Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Menu Item Name"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        <input
          type="text"
          name="price"
          placeholder="Price"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
        <input
          type="text"
          name="discount"
          placeholder="Discount"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setDiscount(e.target.value);
          }}
        />
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button
          class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-7"
        >
          Add
        </button>
        {/* {
            result.map((val) => {
                return (<h1>{val}</h1>);
            }
            )
        } */}
        </div>
      </form>
    </div>
  );
};

{/* <div className="change" class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 bg-gray-50 dark:bg-gray-900">
  <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Change Details</h1>
  <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Adress</label>
      <input
        type="email"
        name="email"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
      <input
        type="password"
        name="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Type Old Password"
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
      <input
        type="password"
        name="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Type New Password"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <button
        onClick={change}
        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-7"
      >
        Change
      </button>

      {updateStatus.map((obj) => {
        return (
          <div>
            <h1>{obj}</h1>
          </div>
        );
      })}
    </div>
  </div>
</div>; */}
