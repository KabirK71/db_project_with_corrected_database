import { useState } from "react";
import Axios from "axios";
import logo from "../assets/logo_svg.svg";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [restaurant, setRestaurant] = useState("");
  const navigate = useNavigate();

  // make a state to store the search results
  const [searchResults, setSearchResults] = useState([]);
  // server will send an array of objects contatning search results
  // we will store that array in searchResults state and we will map through it to display the results
  /* 
const obj = {r_name}

 */
  const restGen = (restName) => {
    localStorage.setItem("rest_name",  restName);
    navigate('/displaymenuforcustomer');
  }

  async function search (e) {
    e.preventDefault();
    Axios.post("http://localhost:5000/search", {
      restaurant: restaurant,
    }).then((response) => {
      // set the searchResults state to the response.data

      console.log("here", response.data[0].email);
      // setSearchResults([...searchResults, []]);
      setSearchResults([response.data[0].REST_NAME]);
      console.log("search res", searchResults);
      console.log(response);
    });
  };

  return (
    <div class="items-center justify-center flex flex-col py-5">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
    <img class="w-12 h-12 px-1 pt-1" src={logo} alt="logo" />
    Dastarkhwan
    </a>
      <div class="flex flex-row w-2/3">
        <div class="relative w-full px-2">
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="search"
            placeholder="Enter a cuisine type or a restaurant name"
            onChange={(e) => {
              setRestaurant(e.target.value);
            }}
          />
        </div>
        <button
          onClick={search}
          class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm p-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
        >
          Search
        </button>
      </div>
      <label class="text-xl m-5 font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> Search Result</label>
      <div class="flex flex-col p-6 mx-auto w-2/3 text-center text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
        {searchResults.map((obj) => {
          return (
            <div >
              <button class="text-gray-500 text-sm dark:text-gray-400 mb-3 text-center" 
              onClick={() => {restGen(obj)}}
              >{obj}</button>
            </div>
          );
        })}
        </div>
      </div>
  );
};

// <div className="search" class="flex items-center">
//   <div class="relative w-full px-2">
//     <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="search" placeholder="Enter a cuisine type or a restaurant name" onChange = {(e)=> {setRestaurant(e.target.value)}}/>
//   </div>
//   <button onClick={search} class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm p-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Search</button>
//       {searchResults.map((obj) => {
//           return (
//               <div>
//                   <h1>{obj}</h1>
//                   </div>
//           )
//       })}
