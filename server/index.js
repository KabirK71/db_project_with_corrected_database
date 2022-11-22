const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Kabir@123",
  database: "foodpanda",
});

const handleNewUserSignUp = (email, password) => {
  db.connect((error) => {
    if (!error) {
      console.log("Connection has been established");
      db.query(
        `CREATE DATABASE IF NOT EXISTS foodpanda`,
        async (err2, result) => {
          if (err2) {
            console.log(err2);
          } else {
            console.log("Database Created");
            try {
              //call create table here using await like done below here.
              db.query("USE foodpanda");
              // db.query(
              //   `CREATE TABLE IF NOT EXISTS users(email varchar(255), password varchar(255))`
              // );
              db.query(
                "INSERT INTO C_CONTACT (EMAIL, PASSWORD) VALUES (?, ?)",
                [email, password],
                (err, result) => {
                  console.log(err || result);
                }
              );
            } catch (err) {
              console.log(err);
            }
            db.end();
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
};

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  //check if email doesnt exist
  handleNewUserSignUp(email, password);
  res.json({
    message: "user successfully created"
  })
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.connect((error) => {
    if (!error) {
      db.query(
        "SELECT * FROM C_CONTACT WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              if(result[0].password === password){
              
              console.log("User logged in");
              res.send(result);
            }
            else
            {
              // console.log(result[0].password);
              console.log("Wrong password");
              res.send(result);
            }

              // console.log(result);
              // res.send(result);
            } else {
              res.send({ message: "Wrong username/password combination" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
});

app.post("/search", (req, res) => {
  const restaurant = req.body.restaurant;

  db.connect((error) => {
    if (!error) {
      db.query(
        "SELECT REST_ID FROM RESTAURANT WHERE REST_NAME = ? OR CUISINES = ?",
        [restaurant , restaurant],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "wrong restaurant" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
});





app.post("/addresschange", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const city = req.body.city;
  const street = req.body.street;
  const building = req.body.building;
  const area = req.body.area;
  db.connect((error) => {
    if (!error) {
      db.query(
        "UPDATE C_LOCATION SET AREA = ?, CITY = ?, STREET = ?, BUILDING = ? WHERE (EMAIL = ? and PASSWORD = ?)",
        [area , city , street, building ,email, password],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else 
          {
            if (result.length > 0) 
            {
              console.log("Address Updated");
              res.send(result);
            } 
            else 
            {
              res.send({ message: "Couldn't update Address" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
});





app.post("/change", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.connect((error) => {
    if (!error) {
      db.query(
        "UPDATE C_CONTACT SET PASSWORD = ? WHERE EMAIL = ?",
        [password , email],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else 
          {
            if (result.length > 0) 
            {
              console.log("Password Updated");
              res.send(result);
            } 
            else 
            {
              res.send({ message: "Couldn't update password" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
});





app.listen(5000, () => {
  console.log("Server started at Port 5000");
  // console.log(db.state);
});
