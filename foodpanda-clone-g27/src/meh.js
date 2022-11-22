// import React, {useState} from 'react';
// import Axios from 'axios';
// import './App.css';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// import {Login} from "./components/Login"
// import { Signup } from './components/Signup';


// function App() {
  
//   // const [emailReg, setEmailReg] = useState("");
//   // const [passwordReg, setPasswordReg] = useState("");

//   // const register = () => {
//   //   Axios.post("http://localhost:5000/register", {
//   //     email:emailReg, 
//   //     password:passwordReg,
//   //   }).then((response) => {
//   //     console.log(response);
//   //     });
//   // };


//   return (
//     <div className="App">
//       <div>
//         <div className="SignUp">
//           <h1>Sign Up</h1>
//           <label>Email Adress</label>
//           <input type="email" name="email" placeholder="Email" onChange = {(e)=> {setEmailReg(e.target.value)}}/>
//           <label>Password</label>
//           <input type="password" name="password" placeholder="Password" onChange = {(e)=> {setPasswordReg(e.target.value)}}/>
//           <Link to='/'>
//             <button onClick={register}>Sign Up</button>
//           </Link>
//         </div>

//         <Login></Login>
//       </div>
//     </div>
//   );
// }

// export default App;