// make a component that will allow users to enter a voucher code and send it to the backend using Axios
import React, { useState } from "react";
import Axios from "axios";

export const RestaurantSignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [restaurantname, setRestaurantName] = useState("");

    const signup = () => {
        Axios.post("http://localhost:5000/restsignup", {
        restaurantname: restaurantname,
        email: email,
        password: password,
        phone: phone,
        }).then((response) => {
        console.log(response);
        });
    };

    return (
        <div className="restsignup">
        <label>Restaurant Name</label>
        <input
            type="text"
            name="restaurantname"
            placeholder="Restaurant Name"
            onChange={(e) => {
            setRestaurantName(e.target.value);
            }}
        />

        <label> Email </label>
        <input
            type="email"
            name="email"
            placeholder="Enter your restaurant Email"
            onChange={(e) => {
            setEmail(e.target.value);
            }}
        />

        <label>Password</label>
        <input
            type="text"
            name="password"
            placeholder="Password"
            onChange={(e) => {
            setPassword(e.target.value);
            }}
        />

        <label>Phone Number</label>
        <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            onChange={(e) => {
            setPhone(e.target.value);
            }}
        />
        <button onClick={signup}>SignUp</button>
        </div>
    );
    }
    