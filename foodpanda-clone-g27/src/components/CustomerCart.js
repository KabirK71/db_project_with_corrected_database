import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


export const CustomerCart = () =>
{
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([])
    
    const backtomenu = () =>{
        navigate('/displaymenuforcustomer')
    }
    const placeorder = () =>
    {
        Axios.post("http://localhost:5000/placeorder",{
        }).then((response) =>{
            console.log(response)
            setSearchResults(...searchResults, response.data);
        });
        // navigate('/displaymenuforcustomer')
           
    }



    useEffect (()=>{
        Axios.post("http://localhost:5000/customercart",{
        }).then((response) =>{
            console.log(response)
            setSearchResults(...searchResults, response.data);
        });
    }, []);

    const deletefromcart = (foodname, quantity)=>
    {
        Axios.post("http://localhost:5000/deletefromcustomercart",
        {
            foodname:foodname,
            quantity:quantity
            // customer:customer,
        }).then((response) =>{
            console.log(response)
            setSearchResults(...searchResults, response.data);
        });
    }



    const cart = searchResults.map((item) => (
        <div class="space-y-8 sm:gap-6 xl:gap-10 lg:space-y-0 px-2 pb-5 ">
          <button
            class="w-full flex flex-col p-6 mx-auto text-gray-900 bg-white rounded-lg border border-gray-200 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white hover:bg-gray-50">
            <p href="" class="mb-4 text-md font-semibold">
              {item.FOOD_NAME}
            </p>
            <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">PRICE: {item.PRICE} Rs.</p>
            <p class="text-gray-500 text-sm dark:text-gray-400 mb-3">QUANTITY: {item.QUANTITY}</p>

            <button  class="block py-2 mx-5 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" onClick={()=>{deletefromcart(item.FOOD_NAME , item.QUANTITY)}}>Remove</button>

          </button>
        </div>
      ));



    return (
        <div className="DisplayMenuCustomer">
        <div>{cart}</div>
        <button onClick={backtomenu}>Back to restaurant menu</button>
        <br></br>
        <button onClick={placeorder}>place order</button>
        
        </div>
    );




}