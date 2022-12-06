// create a component that displays the order history of the customer
import { useState, useEffect } from "react";
import Axios from "axios";

export const COrderHistory = () => {
    const [menuList, setMenuList] = useState([]);
    
    useEffect(() => {
        Axios.post("http://localhost:5000/restaurantmenu").then((response) => {
            console.log(response.data.length);
            // for (let i = 0; i < response.data.length; i++) {
                // console.log(i);
                setOrderHistory(orderHistory => [...response.data]);
            // }
        });
    }, []);

    return (
        <div className="RestaurantMenu">
        <label>menu</label>
        {orderHistory.map(({FOOD_NAME , FOOD_PRICE}) =>(
            <p key = {REST_NAME}> RESTAURANT {REST_NAME} WITH STATUS: {STATUS_ORDER}  </p>
        ))}
        </div>
    );
}