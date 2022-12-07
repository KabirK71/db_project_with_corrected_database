import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


export const DisplayMenuForCustomer = () =>
{
    const navigate = useNavigate();

    const restname = localStorage.getItem("rest_name")
    // console.log(restname)
    const [quantity, setQuantity] = useState([]);
    const [food_name, setFoodName] = useState([]);
    const [food_price, setFoodPrice] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    // const [carting, setCarting] = useState([]);
    const [quan, setQuan] = useState(0);

    useEffect (()=>{
        Axios.post("http://localhost:5000/displaymenuforcustomer",{
            restname : restname,
        }).then((response) =>{
            setSearchResults(...searchResults, response.data);
            // setFoodName(response.data.FOOD_NAME);
            // setFoodPrice(response.data.FOOD_PRICE);
        });
    }, []);


    const callingAddToCart = (foodname, qty, foodprice) =>
    {

        Axios.post("http://localhost:5000/addtocart" , {
            food_name: foodname,
            quantity: qty,
            food_price: foodprice, 
            restname : restname,

        }).then((response) => {
            console.log(response);
        });
    } 
    
    const redirectToCart = () =>
    {
        navigate('/customercart');

    }


    const menu = searchResults.map((item) => (
        <div class="space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0 px-2 pb-5 ">
          <button
            class="w-full flex flex-col p-6 mx-auto text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:bg-gray-50">
            <p href="" class="mb-4 text-md font-semibold">
              {item.REST_NAME}
            </p>
            <p class="text-gray-500 text-sm dark:text-gray-400 mb-3 font-bold">{item.FOOD_NAME}</p>
            <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">{item.FOOD_PRICE} Rs.</p>
            <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">Chef's Note: {item.DESCRIPTION}</p>
            <input type="number" placeholder="Enter Quantity" onChange={(e) => {setQuan(e.target.value)
            }}/>

            <button class="w-full flex flex-col p-6 mx-auto text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:bg-gray-50" onClick={()=>{
                callingAddToCart(item.FOOD_NAME, quan, item.FOOD_PRICE);
            }}>Add to cart</button>

          </button>
        </div>
      ));



    return (
        <div className="DisplayMenuCustomer">
        <div>{menu}</div>
        <button  class="block py-2 mx-5 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" onClick={redirectToCart} >Go to Cart</button>
        </div>
    );




}