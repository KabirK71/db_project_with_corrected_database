import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/logo_svg.svg";

export const Signup = () => {

  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:5000/register", {
      email:emailReg, 
      password:passwordReg,
    }).then((response) => {
      console.log(response);
      });
  };

  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-12 h-12 px-1 pt-1" src={logo} alt="logo" />
          Dastarkhwan
        </a>
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an account</h1>
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
                  required=""
                  onChange={(e) => {
                    setEmailReg(e.target.value);
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
                  required=""
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
              </div>
              <Link to= '/login'>
                <button
                  type="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-7"
                  onClick={register}
                >
                  Sign Up
                </button>
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
};




// import { useState } from "react";
// import Axios from "axios"
// import { Link } from "react-router-dom";

// export const Signup = () => {

//   const [emailReg, setEmailReg] = useState("");
//   const [passwordReg, setPasswordReg] = useState("");

//   const register = () => {
//     Axios.post("http://localhost:5000/register", {
//       email:emailReg, 
//       password:passwordReg,
//     }).then((response) => {
//       console.log(response);
//       });
//   };

//     return (
//       <div className="SignUp">
//         <h1>Sign Up</h1>
//         <label>Email Adress</label>
//         <input type="email" name="email" placeholder="Email" onChange = {(e)=> {setEmailReg(e.target.value)}}/>
//         <label>Password</label>
//         <input type="password" name="password" placeholder="Password" onChange = {(e)=> {setPasswordReg(e.target.value)}}/>
//         <Link to='/login'>
//           <button onClick={register}>Sign Up</button>
//         </Link>
//       </div>
//     );
// }