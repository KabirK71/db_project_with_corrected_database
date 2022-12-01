// make a component that will allow users to enter a voucher code and send it to the backend using Axios
import React, { useState } from "react";
import Axios from "axios";

export const RestaurantSignup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState();
    const [restaurantname, setRestaurantName] = useState("");

    const restsignup = () => {
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

        <label>Voucher Code</label>
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
            placeholder="Enter your restaurant ID"
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
        <button onClick={restsignup}>SignUp</button>
        </div>
    );
    }
    