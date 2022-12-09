// make a component that will allow users to confirm an order through a button and communicate with backend using Axios
import React, { useState } from "react";
import Axios from "axios";

export const ConfirmOrder = () => {
    const [order, setOrder] = useState("");
// i think yahan pe useEffect bhi hoga
    const confirm = () => {
        Axios.post("https://dastarkhwan-g27.herokuapp.com/confirmorder", {
        order: order,
        }).then((response) => {
        console.log(response);
        });
    };

    return (
        <div className="confirm">
        <label>Order ID</label>
        <input
            type="text"
            name="order_id"
            placeholder="Order ID"
            onChange={(e) => {
            setOrder(e.target.value);
            }}
        />
        <button onClick={confirm}>Confirm</button>
        </div>
    );
    }