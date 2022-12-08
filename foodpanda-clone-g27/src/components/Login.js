import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_svg.svg";
const bcrypt = require("bcryptjs");

// async function hashPassword(mypwd){
//   var hashPwd = await bcrypt.hash(mypwd,10);
//   console.log("THE HASHED PWD IS",hashPwd);
//   return hashPwd;
// }

export const Login = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function handleOptionChange (changeEvent) {
  //   this.setState({
  //     selectedOption: changeEvent.target.value
  //   });
  // }



  async function login (e) {
    e.preventDefault()
    // Promise.resolve(hashPassword(password))
    // .then((hashPwd) => {
    //   setPassword(hashPwd);0
    //   console.log("THE HASHED PWD IS",hashPwd);
    Axios.post("http://localhost:5000/login", {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if (response.data.message === "User logged in") {
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("email", email);
        setLoginStatus(response.data.message);
        if (response.data.type === "customer")
          navigate("/landingpagecustomer");
        else if (response.data.type === "rider")
          navigate("/landingpageforrider");
        else if (response.data.type === "restaurant")
          navigate("/landingpageforrestaurant");
      } else if (response.data.message === "User not found") {
        //need to set state
        setLoginStatus(response.data.message);
        alert("Incorrect Email or Password");
        // console.log("Wrong username/password combination");
      }
    });

    // });
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-12 h-12 px-1 pt-1" src={logo} alt="logo" />
          Dastarkhwan
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <form class="p-6 space-y-4 md:space-y-6 sm:p-8" onSubmit={login}>
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login to your account</h1>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="abc@xyz.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-7"
            >
              Login
            </button>
            <p>{loginStatus}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

//prev login just in case
{
  /* // return (
    //     <div className="Login">
    //     <h1>Login</h1>
    //     <label>Email Address</label>
    //     <input type="email" name="email" placeholder="Email" onChange = {(e)=> {setEmail(e.target.value)}}/>
    //     <label>Password</label>
    //     <input type="password" name="password" placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}}/>
    //     <Link to = {`${loginStatus === 2 &&  "/search" || loginStatus === 0 && "/" }`}>
    //       <button onClick={login}>Login</button>

    //     </Link>
        
    //   </div>
    // ); */
}
