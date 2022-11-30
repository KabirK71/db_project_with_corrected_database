// make a component that displays items received from the backend in a card format
import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export const DisplayOrdersRestaurant = () => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        Axios.post("http://localhost:5000/displayordersrestaurant").then((response) => {
            console.log(response);
            console.log("rendered");
            setSearchResults([...searchResults, response.data[0]]);
        });
    }, []);

    return (
        <div className="DisplayOrdersRestaurant">
        <label>Orders</label>
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