// create a component that allows the restaurant owner to delete menu item
import React, { useState } from "react";
import Axios from "axios";

export const DeleteMenu = () => {
  const [name, setName] = useState("");
  // const [result, setResult] = useState([]);
  const id = localStorage.getItem("id");

  const Delete = () => {
    Axios.post("https://dastarkhwan-g27.herokuapp.com/deletemenu", {
      name: name,
      id: id,
    }).then((response) => {
      console.log(response.data)
      if (response.data.message === "Item not Deleted") {
        alert("Item not Deleted");
      } 
      else if (response.data.message === "Item does not exist")
      {
        alert("Item does not exist");
      }
      else {
        alert("Item Deleted");
      }
    });
  };

  return (
    <div className="delete-menu" class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 bg-gray-50 dark:bg-gray-900">
      <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Delete Menu Item</h1>
      <form class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700" onSubmit={Delete}>
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Menu Item Name</label>
      <input
        type="text"
        name="name"
        required
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Menu Item Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-7"
      >
        Delete
      </button>
      </div>
      </form>
    </div>
  );
};
