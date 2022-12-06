// make a component that will allow users to change their address
import React, { useState } from "react";
import Axios from "axios";

export const AddressChange = () => {
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [building, setBuilding] = useState("");
    const [street, SetStreet] = useState("");
    
    const change = () => {
        Axios.post("http://localhost:5000/addresschange", {
        // address: address,
        email: email,
        city: city,
        area: area,
        building: building,
        street: street,
        }).then((response) => {
        console.log(response);
        });
    };
    return (
        <div className="change">
        <label>Email Adress</label>
        <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => {
            setEmail(e.target.value);
            }}
        />

        <label>City</label>
        <input
            type="text"
            name="city"
            placeholder="City"
            onChange={(e) => {
            setCity(e.target.value);
            }}
        />
        <label>Area</label>
        <input
            type="text"
            name="area"
            placeholder="Area"
            onChange={(e) => {
            setArea(e.target.value);
            }}
        />
        <label>Building</label>
        <input
            type="text"
            name="building"
            placeholder="Building"
            onChange={(e) => {
            setBuilding(e.target.value);
            }}
        />
        <label>Street</label>
        <input
            type="text"
            name="street"
            placeholder="Street"
            onChange={(e) => {
            SetStreet(e.target.value);
            }}
        />
        <button onClick={change}>Change</button>
        </div>
    );
    }