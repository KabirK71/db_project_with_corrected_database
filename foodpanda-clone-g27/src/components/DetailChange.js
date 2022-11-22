// make a component that will allow user to change their details
import React, { useState } from "react";
import Axios from "axios";

export const DetailChange = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const change = () => {
    Axios.post("http://localhost:5000/change", {
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="change">
      <h1>Change Details</h1>
      <label>Email Adress</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={change}>Change</button>
    </div>
  );
};


// how to push a folder in github using command line
// git init
// git add .
// git commit -m "first commit"
// git remote add origin
// git push -u origin master

// how to push a folder to github in an exising repository
// git init
// git add .
// git commit -m "first commit"
// git remote add origin
// git push -u origin master
