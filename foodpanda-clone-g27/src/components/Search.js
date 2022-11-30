import { useState } from "react";
import Axios from "axios"

export const Search = () => {

    const [restaurant,setRestaurant] = useState("");

    // make a state to store the search results
    const [searchResults, setSearchResults] = useState([]);
// server will send an array of objects contatning search results
// we will store that array in searchResults state and we will map through it to display the results
/* 
const obj = {r_name}

 */


    const search = () => {
    Axios.post("http://localhost:5000/search", {
        restaurant : restaurant
    }).then((response) => {
    // set the searchResults state to the response.data
    
    console.log("here",response.data[0].email)
    setSearchResults([...searchResults, response.data[0].RESTAURANT]);
    console.log("search res",searchResults)    
      console.log(response);
    });
  };

    return (
    <div className="search" class="flex items-center">
      <div class="relative w-full px-2">
        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="search" placeholder="Enter a cuisine type or a restaurant name" onChange = {(e)=> {setRestaurant(e.target.value)}}/>
      </div>
      <button onClick={search} class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm p-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Search</button>
          {searchResults.map((obj) => {
              return (
                  <div>
                      <h1>{obj}</h1>
                      </div>
              )
          })}
        
    </div>
    );
}
