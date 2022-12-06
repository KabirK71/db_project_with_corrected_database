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
  password: "mrm71101",
  database: "foodpanda",
});

const handleNewUserSignUp = (email, password, f_name, l_name) => {
  // db.connect((error) => {
  //   if (!error) {
  //     console.log("Connection has been established");
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
                "INSERT INTO CUSTOMER (FIRST_NAME , LAST_NAME) VALUES (?, ?);",
                [f_name, l_name],
                (err, result) => {
                  console.log(err || result);
                }
              );
              db.query(
                "INSERT INTO C_CONTACT (EMAIL, PWD) VALUES ( ?, ?);",
                [email, password],
                (err, result) => {
                  console.log(err || result);
                }
              );
            } catch (err) {
              console.log(err);
            }
            // db.end();
          }
        }
      );
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
};

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const f_name = req.body.firstname;
  const l_name = req.body.lastname;

  //check if email doesnt exist
  handleNewUserSignUp(email, password, f_name, l_name);
  res.json({
    message: "user successfully created"
  })
});


app.post("/vouchergenerate", (req, res) => {
  const code = req.body.voucher;
  const restaurant = req.body.restaurant;
  const deduct = req.body.deduct;

  //check if email doesnt exist
  db.query(
    "INSERT INTO VOUCHER(CODE, REST_ID, DEDUCT) VALUES (?,?,?)",
    [code,restaurant,deduct], (err, result)=>{
      console.log(err||result);
      if (err)
      {
        res.send({message:"error"});
      }
      else
      {
        res.send({message:"settay"});
      }
    }
    );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

    db.query(
      "SELECT * FROM C_CONTACT WHERE EMAIL = ? AND PWD = ?",
      [email, password],
      (err, result) => {
        console.log(result);
        if (err) {
          res.send({ err: err });
        } else {
          if (result.length > 0) {
            console.log(result);
            if(result[0].PWD === password){
            
            console.log("User logged in");
            res.send(result);
          }
          else
          {
            alert("FAIL FAIL")
            console.log("Wrong password");
            res.send(result);
          }

          } else {
            res.send({ message: "Wrong username/password combination" });
          }
        }
      }
    ); 
});

app.post("/restsignup", (req, res) => {
  
  const restaurantname = req.body.restaurantname;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const city = req.body.city;
  const area = req.body.area;
  const street = req.body.street;
  const building = req.body.building;
  
  db.query(
    "INSERT INTO RESTAURANT (REST_NAME) VALUES (?);",
    [restaurantname],
    (err, result) => {
      if (err) {
        res.send({ message: err });
      } else {
        db.query(
          "INSERT INTO R_CONTACT (PHONE_NO, EMAIL, PWD) VALUES (?, ?, ?);",
          [phone, email, password],
          (err, result) => {
            if (err) {
              res.send({ message: err });
            } else {
              // res.send({message: "Information Saved"});
              db.query(
                "INSERT INTO R_LOCATION (CITY, AREA, STREET, BUILDING) VALUES (?, ?, ?, ?);",
                [city, area, street, building],
                (err, result) => {
                  if (err) {
                    res.send({ err: err });
                  } else {
                    res.send({message: "Information Saved"});
                  }
                }
              );
            }
          }
        );
        // res.send({message: "Information Saved"});
      }
    }
  );

 
});



app.post("/search", (req, res) => {
  const restaurant = req.body.restaurant;

  db.query(
    "SELECT * FROM RESTAURANT WHERE REST_NAME = ? OR CUISINES = ?",
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
});

app.post("/landingpageforcustomers", (req, res) => {
  
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
});

app.post("/landingpageforrestaurant", (req, res) => {
  
  const restaurant = "jj@jj"; // token shit here
  db.query("SELECT REST_ID FROM R_CONTACT WHERE EMAIL = ?",
  [restaurant],
  (err,result1)=>{
    console.log(result1);
    if (err) {
      res.send({message:err})
    }
    else
    {
      const rest_id = result1[0].REST_ID; 
      db.query(
        "SELECT FOOD_NAME, FOOD_PRICE FROM MENU WHERE REST_ID = ?",
        [rest_id],
        (err, result) => {
          console.log(result);
          if (err) {
            res.send({ message: err });
          } else {
            // console.log(result);
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "no menu found" });
            }
          }
        }
      );
    }
  })


});

app.post("/addmenu", (req, res) => {
  
  const name = req.body.name;
  const email = req.body.email;
  const price = req.body.price;
  const desc = req.body.description;

  // db.connect((error) => {
  //   if (!error) {
    db.query("SELECT REST_ID FROM R_CONTACT WHERE EMAIL = (?)",
    [email],
    (err,result1) =>{
      if (err) {
        res.send({message:err})
      }
      else
      {
        const rest_id = result1[0].REST_ID;
         db.query(
          "INSERT INTO MENU (FOOD_NAME, FOOD_PRICE, DESCRIPTION, REST_ID) VALUES (?,?,?,?)",
          [name, price, desc, rest_id],
          (err, result) => {
            if (err) {
              res.send({ err: err });
            } else {
              res.send({message: "Item Inserted"});
            }
          }
        );

      }
    })


  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});


app.post("/deletemenu", (req, res) => {
  
  const email = req.body.email;
  const name = req.body.name;
  // db.connect((error) => {
  //   if (!error) {
      db.query(
        "DELETE FROM MENU WHERE REST_ID = (SELECT REST_ID FROM R_CONTACT WHERE EMAIL = ?) AND FOOD_NAME = ?",
        [email, name],
        (err, result) => {
          if (err) {
            res.send({ message: err });
          } else {
            res.send({message: "Item Deleted!"})
          }
        }
      );
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});

app.post("/selectedrestaurant", (req, res) => {
  
  const restaurant = req.body.restaurant;
  
  // db.connect((error) => {
  //   if (!error) {
      db.query(
        "SELECT FOOD_NAME, FOOD_PRICE FROM MENU WHERE REST_NAME = ?",
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
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});



app.post("/addtocart", (req, res) => {
  
  const restaurant = req.body.restaurant;
  const food = req.body.food;
  const price = req.body.price;
  const customer = req.body.customer;
  const quantity = req.body.quantity;
  // db.connect((error) => {
  //   if (!error) {
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
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});




app.post("/deletefromcart", (req, res) => {
  
  const restaurant = req.body.restaurant;
  const food = req.body.food;
  const customer = req.body.customer;
  
  // db.connect((error) => {
  //   if (!error) {
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
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});



app.post("/cart", (req, res) => {
  
  const customer = req.body.customer;
  
  // db.connect((error) => {
  //   if (!error) {
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
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});




app.post("/voucher", (req, res) => {
  
  // const restaurant = req.body.restaurant;
  const code = req.body.code;
  
  // db.connect((error) => {
  //   if (!error) {
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
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});



app.post("/placeorder", (req, res) => {
  
  //  const restaurant = req.body.restaurant;
  
  
  // db.connect((error) => {
  //   if (!error) {
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
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
// app.post("/vouchergenerate", (req, res) => {
  
//   const restaurant = 2;
//   const code = "SARIM123";
//   const deduct = 23;
  
//   console.log(restaurant);
//   console.log(code);
//   console.log(deduct);

//   // db.connect((error) => {
//   //   if (!error) {
//       db.query(
//         ""
//         [code, restaurant, deduct],
//         (err, result) => {
//           if (err) {
//             console.log(err)
//             res.send({ err: err });
//           } else {
//             if (result.length > 0) {
//               res.send({ message: "Voucher generated" });
//             } else {
//               res.send({ message: "Unable to generate voucher" });
//             }
//           }
//         }
//       );
//   //   } else {
//   //     console.log("Connection failed");
//   //     console.log(error);
//   //   }
//   // });
//   // db.end();
// });



/////////////////////////////////////////////////////////////////////////////////////////////////

app.post("/confirmorder", (req, res) => {
  
  const order = req.body.order;
  
  // db.connect((error) => {
  //   if (!error) {
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
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});


app.post("/deliverorder", (req, res) => {
  
  const order = req.body.order;
  
  // db.connect((error) => {
  //   if (!error) {
      db.query(
        "UPDATE ORDER SET STATUS = 'COMPLETED' WHERE ORDER_ID = ?"
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
  //   } else {
  //     console.log("Connection failed");
  //     console.log(error);
  //   }
  // });
  // db.end();
});

//////////////////////////////////////////////////////////
// app.post("/customerorderhistory", (req, res) => {
  
//   const cust = 1;
  
//   // db.connect((error) => {
//   //   if (!error) {
//       db.query(
//         "SELECT * FROM ORDERS WHERE CUST_ID = ?"
//         [cust],
//         (err, result) => {
//           if (err) {
//             res.send({ err: err });
//           } else {
//             if (result.length > 0) {
//               console.log(result);
//               res.send(result);
//             } else {
//               res.send({ message: "No orders to show" });
//             }
//           }
//         }
//       );
//   //   } else {
//   //     console.log("Connection failed");
//   //     console.log(error);
//   //   }
//   // });
//   // db.end();
// });
//////////////////////////////////////////

app.post("/customerorderhistory", (req, res) => {
  const cust = 1; // token shit here
  //check if email doesnt exist
  db.query(
    "SELECT REST_NAME, STATUS_ORDER FROM RESTAURANT,ORDERS WHERE (RESTAURANT.REST_ID = ORDERS.REST_ID AND CUST_ID = ?)",
    [cust], (err, result)=>{
      console.log(err||result);
      if (err)
      {
        res.send({REST_ID: "error"});
      }
      else
      {
        console.log(result);
        res.send(result);
      }
    }
    );
});






app.post("/displayordersrestaurant", (req, res) => {
  
  const rest = req.body.restaurant;

      db.query(
        "SELECT * FROM ORDERS WHERE REST_ID = ? AND STATUS_ORDER = 'DELIVERING'",
        [rest],
        (err, result) => {
          console.log(result);
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

});




app.post("/addresschange", (req, res) => {
  const email = req.body.email;
  const city = req.body.city;
  const street = req.body.street;
  const building = req.body.building;
  const area = req.body.area;


      db.query("SELECT CUST_ID FROM C_CONTACT WHERE EMAIL = ?",
      [email],
      (err,result)=>{
        if (err) {
          res.send({message: err})
        }
        else
        {
          const cust_id = result[0].CUST_ID;
          console.log(cust_id);
          db.query(
            "UPDATE C_LOCATION SET AREA = ?, CITY = ?, STREET = ?, BUILDING = ? WHERE CUST_ID = ?",
            [area , city , street, building, cust_id],
            (err, result) => {
              if (err) {
                res.send({ err: err });
              } else 
              {
                res.send({message: "Updated"})
              }
            }
          );

        }
      })

});





app.post("/updatepassword", (req, res) => {
  const email = req.body.email;
  const oldpassword = req.body.oldpassword;
  const newpassword = req.body.newpassword;
  console.log(email);
  console.log(oldpassword);
  console.log(newpassword);

      db.query(
        "SELECT * FROM C_CONTACT WHERE (EMAIL = ? AND PWD = ?)",
        [email, oldpassword],
        (err, result) => {
          if (err) {
            res.send({ message: "couldnt update password" });
          } 
          if(result.length > 0)
          {
            db.query("UPDATE C_CONTACT SET PWD = ? WHERE (EMAIL = ? AND PWD = ?)", [newpassword, email, oldpassword]);
            res.send({message: "password updated"})
          }
          else 
          {
            res.send({message : "Incorrect Old Password"})
          }
        }
      );

});





app.listen(5000, () => {
  console.log("Server started at Port 5000");
  // console.log(db.state);
});
