// create a component that allows the restaurant owner to delete menu item
import React, { useState } from "react";
import Axios from "axios";

export const DeleteMenu = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [result, setResult] = useState([]);

    const Delete = () => {
        Axios.post("http://localhost:5000/deletemenu", {
        name: name,
        email: email,
        
        }).then((response) => {
        console.log(response);
        // setResult([...result, response.message]);

        });
    };
    
    return (
        <div className="delete-menu">
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
        <button onClick={Delete}>Delete</button>
        </div>
    );
}