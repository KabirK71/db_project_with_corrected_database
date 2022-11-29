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
  // db.end();
});





app.post("/landingpageforcustomers", (req, res) => {
  

  db.connect((error) => {
    if (!error) {
      db.query(
        "SELECT * FROM RESTAURANT LIMIT 50",
        [],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "no restaurants found" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});


app.post("/landingpageforrestaurant", (req, res) => {
  
  const restaurant = req.body.restaurant;
  db.connect((error) => {
    if (!error) {
      db.query(
        "SELECT FOOD_NAME, FOOD_PRICE FROM MENU WHERE REST_ID = ?",
        [restaurant],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "no menu found" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});

app.post("/landingpageforrestaurantadd", (req, res) => {
  
  const restaurant = req.body.restaurant;
  const food = req.body.food;
  const price = req.body.price;
  db.connect((error) => {
    if (!error) {
      db.query(
        "INSERT INTO MENU (FOOD_NAME, FOOD_PRICE) VALUES (?,?) WHERE REST_ID = ?",
        [food, price, restaurant],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send({message: "item inserted"});
            } else {
              res.send({ message: "Could not add item" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});


app.post("/landingpageforrestaurantdelete", (req, res) => {
  
  const restaurant = req.body.restaurant;
  const food = req.body.food;
  db.connect((error) => {
    if (!error) {
      db.query(
        "DELETE FROM MENU WHERE REST_ID = ? AND FOOD_NAME = ?",
        [restaurant, food],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send({message: "item deleted"});
            } else {
              res.send({ message: "Could not delete item" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});

app.post("/selectedrestaurant", (req, res) => {
  
  const restaurant = req.body.restaurant;
  
  db.connect((error) => {
    if (!error) {
      db.query(
        "SELECT FOOD_NAME, FOOD_PRICE FROM MENU WHERE REST_ID = ?",
        [restaurant],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "Could not display restaurant" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});



app.post("/addtocart", (req, res) => {
  
  const restaurant = req.body.restaurant;
  const food = req.body.food;
  const price = req.body.price;
  const customer = req.body.customer;
  const quantity = req.body.quantity;
  db.connect((error) => {
    if (!error) {
      db.query(
        "INSERT INTO CART (FOOD_NAME, FOOD_PRICE, QUANTITY, CUST_ID, REST_ID) VALUES (?,?,?,?,?) ; INSERT INTO CART (FOOD_ID) VALUES (SELECT FOOD_ID FROM MENU WHERE REST_ID = ?)",
        [food, price, quantity, customer, restaurant , restaurant],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send({message: "added to cart"});
            } else {
              res.send({ message: "Could not add to cart" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});




app.post("/deletefromcart", (req, res) => {
  
  const restaurant = req.body.restaurant;
  const food = req.body.food;
  const customer = req.body.customer;
  
  db.connect((error) => {
    if (!error) {
      db.query(
        "DELETE FROM CART WHERE CUST_ID = ? AND FOOD_NAME = ? AND REST_ID = ?",
        [food, customer, restaurant],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send({message: "removed from cart"});
            } else {
              res.send({ message: "Could not remove from cart" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});



app.post("/cart", (req, res) => {
  
  const customer = req.body.customer;
  
  db.connect((error) => {
    if (!error) {
      db.query(
        "SELECT FOOD_NAME, FOOD_PRICE, QUANITY FROM CART WHERE CUST_ID = ?",
        [customer],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send({message: "this is cart"});
            } else {
              res.send({ message: "Could not display cart" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});




app.post("/voucher", (req, res) => {
  
  // const restaurant = req.body.restaurant;
  const code = req.body.code;
  
  db.connect((error) => {
    if (!error) {
      db.query(
        "SELECT PERCENT_DEDUCTION FROM VOUCHER WHERE CODE = ?",
        [code],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "Voucher Invalid" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});



app.post("/placeorder", (req, res) => {
  
  //  const restaurant = req.body.restaurant;
  
  
  db.connect((error) => {
    if (!error) {
      db.query(
        "INSERT INTO ORDER (CUST_ID, REST_ID, FOOD_ID, FOOD_PRICE , COUNT) VALUES (SELECT CUST_ID, REST_ID, FOOD_ID, FOOD_PRICE, QUANTITY FROM CART); INSERT INTO ORDER (RIDER_ID, TIME, STATUS) VALUES ((SELECT RIDER_ID FROM RIDER WHERE FREE = 1 LIMIT 1) , 1.1.1 , 'DELIVERING') ",
        [code],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "Voucher Invalid" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});

app.post("/vouchergenerate", (req, res) => {
  
  const restaurant = req.body.restaurant;
  const code = req.body.code;
  const deduct = req.body.deduct;
  
  
  db.connect((error) => {
    if (!error) {
      db.query(
        "INSERT INTO VOUCHERS (CODE, REST_ID, PERCENT_DISCOUNT) VALUES (?, ?, ?)"
        [code, restaurant, deduct],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send({ message: "Voucher generated" });
            } else {
              res.send({ message: "Unable to generate voucher" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});

app.post("/confirmorder", (req, res) => {
  
  const order = req.body.order;
  
  
  
  db.connect((error) => {
    if (!error) {
      db.query(
        "UPDATE ORDER SET STATUS = 'DELIVERED' WHERE ORDER_ID = ?"
        [order],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send({ message: "status updated" });
            } else {
              res.send({ message: "unable to update status" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});

app.post("/orderhistory", (req, res) => {
  
  const cust = req.body.cust;
  
  db.connect((error) => {
    if (!error) {
      db.query(
        "SELECT * FROM ORDER WHERE CUST_ID = ?"
        [cust],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "No orders to show" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
});


app.post("/displayordersrestaurant", (req, res) => {
  
  const rest = req.body.restaurant;
  
  db.connect((error) => {
    if (!error) {
      db.query(
        "SELECT * FROM ORDER WHERE REST_ID = ? AND STATUS = 'DELIVERING'"
        [rest],
        (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "No orders to show" });
            }
          }
        }
      );
    } else {
      console.log("Connection failed");
      console.log(error);
    }
  });
  // db.end();
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
