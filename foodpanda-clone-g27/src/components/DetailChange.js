// make a component that will allow user to change their details
import React, { useState } from "react";
import Axios from "axios";

export const DetailChange = () => {
  const [email, setEmail] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [updateStatus, setUpdateStatus] = useState([]);
  

  const change = () => {
    Axios.post("http://localhost:5000/updatepassword", {
      email: email,
      oldpassword: oldpassword,
      newpassword: newpassword,

    }).then((response) => {
      console.log("below is response");
      console.log(response);
      console.log("below is response.data.message");

      console.log(response.data.message);
      setUpdateStatus([response.data.message])
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
      <br></br>
      <label>Old Password</label>
      <input
        type="password"
        name="password"
        placeholder="Type Old Password"
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />
      <br></br>
      <label>New Password</label>
      <input
        type="password"
        name="password"
        placeholder="Type New Password"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <br></br>
      <button onClick={change}>Change</button>
      
      {updateStatus.map((obj) => {
            return (
                <div>
                    <h1>{obj}</h1>
                </div>
            );
        })}
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
