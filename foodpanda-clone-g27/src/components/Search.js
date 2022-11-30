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
    setSearchResults([...searchResults, []])
    setSearchResults([...searchResults, response.data[0].REST_NAME]);
    console.log("search res",searchResults)    
      console.log(response);
    });
  };

    return (
    <div className="search">
        <h1>search</h1>
        <label>Search</label>
        <input type="text" name="search" placeholder="enter a cuisine type or a restaurant name" onChange = {(e)=> {setRestaurant(e.target.value)}}/>
        <button onClick={search}>Search</button>
        <br></br>
        <label> search history</label>
        {searchResults.map((obj) => {
            return (
                <div>
                    <h1>{obj}</h1>
                </div>
            );
        })}
        
    </div>
    );
}