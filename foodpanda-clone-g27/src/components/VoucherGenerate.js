// make a component that will allow users to enter a voucher code and send it to the backend using Axios
import React, { useState } from "react";
import Axios from "axios";

export const VoucherGenerate = () => {
    const [voucher, setVoucher] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [deduct, setDeduct] = useState("");

    const generate = () => {
        Axios.post("http://localhost:5000/vouchergenerate", {
        voucher: voucher,
        restaurant: restaurant,
        deduct: deduct,
        }).then((response) => {
        console.log(response);
        });
    };

    return (
        <div className="generate">
        <label>Voucher Code</label>
        <input
            type="text"
            name="voucher"
            placeholder="Voucher Code"
            onChange={(e) => {
            setVoucher(e.target.value);
            }}
        />
        <label>Restaurant ID</label>
        <input
            type="email"
            name="email"
            placeholder="Enter your restauran ID"
            onChange={(e) => {
            setRestaurant(e.target.value);
            }}
        />
        <label>Percentage To Deduct</label>
        <input
            type="number"
            name="percentage"
            placeholder="Percentage to deduct"
            onChange={(e) => {
            setDeduct(e.target.value);
            }}
        />
        <button onClick={generate}>Generate</button>
        </div>
    );
    }


    // there is a problem with this one guys. The restaurant is not supposed to know its own id. We will just have to take an email from them and get the rest_id from the backend using multiple queries shayad
    