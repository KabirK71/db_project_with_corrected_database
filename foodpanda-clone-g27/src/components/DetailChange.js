// make a component that will allow user to change their details
import React, { useState } from "react";
import Axios from "axios";

export const DetailChange = () => {
  const [email, setEmail] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [updateStatus, setUpdateStatus] = useState([]);

  const change = () => {
    Axios.post("http://localhost:5000/updatepassword", {
      email: email,
      oldpassword: oldpassword,
      newpassword: newpassword,
    }).then((response) => {
      console.log("below is response");
      console.log(response);
      console.log("below is response.data.message");

      console.log(response.data.message);
      setUpdateStatus([response.data.message]);
    });
  };

  return (
    <div className="change" class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 bg-gray-50 dark:bg-gray-900">
      <h1 class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Change Details</h1>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
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
    </div>
  );
};

// how to push a folder in github using command line
// git init
// git add .
// git commit -m "first commit"
// git remote add origin
// git push -u origin master

// how to push a folder to github in an exising repository
// git init
// git add .
// git commit -m "first commit"
// git remote add origin
// git push -u origin master
