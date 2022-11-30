// create a component that displays the order history of the customer
import { useState, useEffect } from "react";
import Axios from "axios";

export const COrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    
    useEffect(() => {
        Axios.post("http://localhost:5000/customerorderhistory").then((response) => {
            console.log(response.data.length);
            // for (let i = 0; i < response.data.length; i++) {
                // console.log(i);
                setOrderHistory(orderHistory => [...response.data]);
            // }
        });
    }, []);

    return (
        <div className="CustomerOrderHistory">
        <label>Order History</label>
        {orderHistory.map(({REST_NAME , STATUS_ORDER}) =>(
            <p key = {REST_NAME}> RESTAURANT {REST_NAME} WITH STATUS: {STATUS_ORDER}  </p>
        ))}
        </div>
    );
}