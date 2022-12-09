import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_svg.svg";
import { Login } from "./Login";
const bcrypt = require("bcryptjs");

async function hashPassword(mypwd) {
  var hashPwd = await bcrypt.hash(mypwd, 10);
  console.log("THE HASHED PWD IS", hashPwd);
  return hashPwd;
}
export const SignUpRest = () => {
  const navigate = useNavigate();
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [restname, setRestName] = useState();
  const [phone, setPhone] = useState();
  const [deliveryfee, setDeliveryFee] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [cuisine, setCuisine] = useState();
  const [building, setBuilding] = useState();
  const [area, setArea] = useState();
  const [pricerating, setPriceRating] = useState();
  const [rating, setRating] = useState();
  const [signupStatus, setSignupStatus] = useState("");


  // generate random number between 0 and 5
  const random = Math.floor(Math.random() * 5) + 1;

  async function register (e) {
    e.preventDefault();
    Axios.post("http://localhost:5000/registerrest", {
    restaurantname: restname,
    email: emailReg,
    password: passwordReg,
    phone: phone,
    city: city,
    area: area,
    street: street,
    building: building,
    deliveryfee: deliveryfee,
    pricerating: pricerating,
    cuisine: cuisine,
    rating: random,

    }).then((response) => {

      if (response.data.message === "EMAIL EXISTS") {
        alert("Email already exists");
        setSignupStatus(response.data.message);
      }
      else
      {
        navigate("/login");
      }
    });
  };


  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-4 mx-auto ">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-12 h-12 px-1 pt-1" src={logo} alt="logo" />
          Dastarkhwan
        </a>
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white pb-4">Create a Restaurant account</h1>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <form class="p-6 space-y-4 md:space-y-6 sm:p-8" onSubmit={register}>
            <div>
              <h1 class="text-lg font-semibold text-pink-700">General Details:</h1>
            </div>
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Restaurant Name
              </label>
              <input
                type="text"
                name="restaurantname"
                id="restaurantname"
                placeholder="Restaurant Name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setRestName(e.target.value);
                }}
              />
            </div>
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Cuisine
              </label>
              <input
                type="text"
                name="cuisine"
                id="cuisine"
                placeholder="Cuisine (Add Only One)"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setCuisine(e.target.value);
                }}
              />
            </div>
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price Rating
              </label>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="$, $$, $$$"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setPriceRating(e.target.value);
                }}
              />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="abc@xyz.com"
                required
                onChange={(e) => {
                  setEmailReg(e.target.value);
                }}
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setPasswordReg(e.target.value);
                }}
              />
            </div>
            <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>

              <input
                type="number"
                name="number"
                id="number"
                placeholder="03xxxxxxxxx"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Delivery Fee
              </label>
              <input
                type="number"
                name="fee"
                id="fee"
                placeholder="Delivery Fee"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setDeliveryFee(e.target.value);
                }}
              />
            </div>
            <div>
              <h1 class="text-lg font-semibold text-pink-700">Address Details:</h1>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Street
              </label>
              <input
                type="text"
                name="street"
                id="street"
                placeholder="Street Name and Number"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Building
              </label>
              <input
                type="text"
                name="building"
                id="building"
                placeholder="Building Name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => {
                  setBuilding(e.target.value);
                }}
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Area
              </label>
              <input
                type="text"
                name="area"
                id="area"
                placeholder="Area e.g. Gulberg, Johar Town"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setArea(e.target.value);
                }}
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="e.g. Lahore, Karachi, Rawalpindi"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-7"
            >
              Sign Up
            </button>
            <p>{signupStatus}</p>
          </form>
        </div>
      </div>
    </section>
  );
};
