// create a component that will be used to add a new menu item

import React, { useState } from "react";
import Axios from "axios";

export const AddMenu = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [result, setResult] = useState([]);

    const Add = () => {
        Axios.post("http://localhost:5000/addmenu", {
        name: name,
        email: email,
        price: price,
        description: description,
        
        }).then((response) => {
        console.log(response);
        setResult([...result, response.message]);

        });
    };
    
    return (
        <div className="add-menu">
        <label> Email</label>
        <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => {
            setEmail(e.target.value);
            }}
        />
        <label>Menu Item Name</label>
        <input
            type="text"
            name="name"
            placeholder="Menu Item Name"
            onChange={(e) => {
            setName(e.target.value);
            }}
        />
        <label>Price</label>
        <input
            type="text"
            name="price"
            placeholder="Price"
            onChange={(e) => {
            setPrice(e.target.value);
            }}
        />
        <label>Description</label>
        <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => {
            setDescription(e.target.value);
            }}
        />

        <button onClick={Add}>Add</button>
        {
            result.map((val) => {
                return (<h1>{val}</h1>);
            }
            )
        }
        </div>
    );
};