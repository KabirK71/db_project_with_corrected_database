const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { response } = require("express");
require ("dotenv").config()
const e = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection(process.env.MYSQL_CON_STRING);

const handleNewCustSignUp = (email, password, f_name, l_name, phone,street, building, area, city, res) => {            
          // db.query(
          //   `CREATE DATABASE IF NOT EXISTS foodpanda`,
          //   async (err2, result) => {
              // if (err2) {
              //   console.log(err2);
              // } else {
                try {
                  // db.query("USE foodpanda");
                  db.query("SELECT * FROM C_CONTACT WHERE EMAIL = ?",
                  [email],
                  (err,result)=>{
                  if (err) {
                    res.send({message:err})
                  }
                  else if (result.length > 0)
                  {
                    res.send({message:"EMAIL EXISTS"})
                  }
                  else
                  {
                    db.query(
                      "INSERT INTO CUSTOMER (FIRST_NAME , LAST_NAME) VALUES (?, ?);",
                      [f_name, l_name],
                      (err, result) => {
                        console.log(err || result);
                      }
                    );
                    db.query(
                      "INSERT INTO C_CONTACT (PHONE_NO, EMAIL, PWD) VALUES (?,?,?);",
                      [phone, email, password],
                      (err, result) => {
                        console.log(err || result);
                      }
                    );
                    db.query(
                      "INSERT INTO C_LOCATION (CITY, AREA, STREET, BUILDING) VALUES (?,?,?,?);",
                      [city, area, street, building],
                      (err, result) => {
                        console.log(err || result);
                      }
                    );
                    
                    res.send(email);
                  }})
                } catch (err) {
                  console.log(err);
                }
              // }
          //   }
          // );

        // }
      // })
};

const handleNewRestSignUp = (email, password, restaurantname, phone,street, building, area, city, deliveryfee, pricerating, cuisine, rating, res) => {            
  db.query(
    `CREATE DATABASE IF NOT EXISTS foodpanda`,
    async (err2, result) => {
      if (err2) {
        console.log(err2);
      } else {
        try {
          // db.query("USE foodpanda");
          db.query("SELECT * FROM R_CONTACT WHERE EMAIL = ?",
          [email],
          (err,result)=>{
          if (err) {
            res.send({message:err})
          }
          else if (result.length > 0)
          {
            res.send({message:"EMAIL EXISTS"})
          }
          else
          {
            db.query(
              "INSERT INTO RESTAURANT (REST_NAME, CUISINES, PRICE_RATING, DELIVERY_FEE, REST_RATING) VALUES (?,?,?,?,?);",
              [restaurantname, cuisine, pricerating, deliveryfee, rating],
              (err, result) => {
                console.log(err || result);
              }
            );
            db.query(
              "INSERT INTO R_CONTACT (PHONE_NO, EMAIL, PWD) VALUES (?,?,?);",
              [phone, email, password],
              (err, result) => {
                console.log(err || result);
              }
            );
            db.query(
              "INSERT INTO R_LOCATION (CITY, AREA, STREET, BUILDING) VALUES (?,?,?,?);",
              [city, area, street, building],
              (err, result) => {
                console.log(err || result);
              }
            );
            
            res.send(email);
          }})
        } catch (err) {
          console.log(err);
        }
      }
    }
  );
};

const handleNewRiderSignUp = (email, password, f_name, l_name, phone, res) => {            
  db.query(
    `CREATE DATABASE IF NOT EXISTS foodpanda`,
    async (err2, result) => {
      if (err2) {
        console.log(err2);
      } else {
        try {
          // db.query("USE foodpanda");
          db.query("SELECT * FROM RD_CONTACT WHERE EMAIL = ?",
          [email],
          (err,result)=>{
          if (err) {
            res.send({message:err})
          }
          else if (result.length > 0)
          {
            res.send({message:"EMAIL EXISTS"})
          }
          else
          {
            db.query(
              "INSERT INTO RIDER (FIRST_NAME, LAST_NAME, FREE) VALUES (?,?, 1);",
              [f_name, l_name],
              (err, result) => {
                console.log(err || result);
              }
            );
            db.query(
              "INSERT INTO RD_CONTACT (PHONE_NO, EMAIL, PWD) VALUES (?,?,?);",
              [phone, email, password],
              (err, result) => {
                console.log(err || result);
              }
            );            
            res.send(email);
          }})
        } catch (err) {
          console.log(err);
        }
      }
    }
  );
};

app.get("/", (req,res)=>{
  res.send("Server working");
});

app.post("/registercust", async function (req, res) {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  const f_name = req.body.firstname;
  const l_name = req.body.lastname;
  const phone = req.body.phone
  const street = req.body.street;
  const building = req.body.building;
  const area = req.body.area;
  const city = req.body.city;
  handleNewCustSignUp(email, password, f_name, l_name, phone,street, building, area, city, res);
});

app.post("/registerrest", async function (req, res) {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  const restaurantname = req.body.restaurantname;
  const phone = req.body.phone
  const street = req.body.street;
  const building = req.body.building;
  const area = req.body.area;
  const city = req.body.city;
  const deliveryfee = req.body.deliveryfee;
  const pricerating = req.body.pricerating;
  const cuisine = req.body.cuisine;
  const rating = req.body.rating;

  handleNewRestSignUp(email, password, restaurantname, phone,street, building, area, city, deliveryfee, pricerating, cuisine, rating, res);
  
});

app.post("/registerrider", async function (req, res) {
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password, 10);
  const f_name = req.body.firstname;
  const l_name = req.body.lastname;
  const phone = req.body.phone

  handleNewRiderSignUp(email, password, f_name, l_name, phone,res);
  
});


app.post("/vouchergenerate", (req, res) => {
  const code = req.body.voucher;
  const rest_id = req.body.id
  const deduct = req.body.deduct;

  //check if email doesnt exist
  db.query(
    "INSERT INTO VOUCHER(CODE, REST_ID, PERCENT_DEDUCTION) VALUES (?,?,?)",
    [code,rest_id,deduct], (err, result)=>{
      if (err)
      {
        res.send({message:"Voucher not generated"});
      }
      else
      {
        res.send({message:"Voucher generated"});
      }
    }
    );
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
    db.query(
      "SELECT * FROM C_CONTACT WHERE EMAIL = ? ",
      [email],
      (err, result) => {
        if (err) {
          res.send({ message: "User not found" });
        } else {
          if (result.length > 0) {
            const queriedpassword = result[0].PWD;
            bcrypt.compare(password, queriedpassword, (err, pass_check) =>{
              if (pass_check === false)
              {
                res.send({ message:"incorrect password"});
                
              }
              else
              {
                res.send({message: "User logged in", type: "customer", id: result[0].CUST_ID});
              }
            })
          }
          else
          {
            db.query(
              "SELECT * FROM R_CONTACT WHERE EMAIL = ?",
              [email],
              (err, result) => {
                if (err) {
                  res.send({ err: err });
                } else {
                  if (result.length > 0) {
                    const queriedpassword = result[0].PWD;
                    bcrypt.compare(password, queriedpassword, (err, pass_check) =>{
                      if (pass_check === false)
                      {
                        res.send({ message:"incorrect password"});
                        
                      }
                      else
                      {
                        res.send({message: "User logged in", type: "restaurant", id: result[0].REST_ID});
                      }
                    })
                    }
                  else
                  {
                    db.query(
                      "SELECT * FROM RD_CONTACT WHERE EMAIL = ?",
                      [email],
                      (err, result) => {
                        if (err) {
                          res.send({ err: err });
                        } else {
                          if (result.length > 0) {
                            const queriedpassword = result[0].PWD;
                            bcrypt.compare(password, queriedpassword, (err, pass_check) =>{
                              if (pass_check === false)
                              {
                                res.send({ message:"incorrect password"});
                                
                              }
                              else
                              {
                                db.query("UPDATE RIDER SET FREE = 1 WHERE RIDER_ID = ?",[result[0].RIDER_ID]);
                                res.send({message: "User logged in", type: "rider", id: result[0].RIDER_ID});
                              }
                            })
                            }
                          else
                          {
                            res.send({message: "User not found"});
                          }
                        }});

                  }
                }});

          }

        }});

      
});




// app.post("/login", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//     db.query(
//       "SELECT * FROM C_CONTACT WHERE EMAIL = ? AND PWD = ?",
//       [email, password],
//       (err, result) => {
//         if (err) {
//           res.send({ message:"User not found"});
//         } else {
//           if (result.length > 0) {
//             res.send({message: "User logged in", type: "customer", id: result[0].CUST_ID});
//           }
//           else
//           {
//             db.query(
//               "SELECT * FROM R_CONTACT WHERE EMAIL = ? AND PWD = ?",
//               [email, password],
//               (err, result) => {
//                 if (err) {
//                   res.send({ err: err });
//                 } else {
//                   if (result.length > 0) {
//                       res.send({message: "User logged in", type: "restaurant", id: result[0].REST_ID});
//                     }
//                   else
//                   {
//                     db.query(
//                       "SELECT * FROM RD_CONTACT WHERE EMAIL = ? AND PWD = ?",
//                       [email, password],
//                       (err, result) => {
//                         if (err) {
//                           res.send({ err: err });
//                         } else {
//                           if (result.length > 0) {
//                               res.send({message: "User logged in", type: "rider", id: result[0].RIDER_ID});
//                             }
//                           else
//                           {
//                             res.send({message: "User not found"});
//                           }
//                         }});

//                   }
//                 }});

//           }

//         }});

      
// });



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




app.post("/riderlogout", (req, res) => {
  const riderid = req.body.id;
  db.query(
    "UPDATE RIDER SET FREE = 1 WHERE RIDER_ID = ?",
    [riderid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({message: "User logged out"});
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
  
  const rest_id = req.body.id; // token shit here
      db.query(
        "SELECT FOOD_NAME, FOOD_PRICE, DISCOUNT, DESCRIPTION FROM MENU WHERE REST_ID = ?",
        [rest_id],
        (err, result) => {
          if (err) {
            res.send({ message: err });
          } else {
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "no menu found" });
            }
          }
        }
      );
    }
  )

  app.post("/landingpageforrider", (req, res) => {
  
    const rider_id = req.body.id; // token shit here
    console.log("RIDER ID IS",rider_id);
        db.query(
          "SELECT * FROM ORDERS WHERE RIDER_ID = ? AND STATUS_ORDER = 'DELIVERING'",
          [rider_id],
          (err, result) => {
            // console.log(result);
            if (err) {
              res.send({ message: "No Orders" });
            } else {
              if (result.length > 0) {
                res.send(result);
              } else {
                res.send({ message: "No Orders" });
              }
            }
          }
        );
      }
    )


app.post("/displaymenuforcustomer", (req, res) => {
  
  const restname = req.body.restname;
  db.query("SELECT * FROM MENU WHERE REST_ID = (SELECT REST_ID FROM RESTAURANT WHERE REST_NAME = ?)",
  [restname], 
  (err,result) => {
    if(err)
    {
      res.send({message:err})
    }
    else
    {
      // console.log(result);
      res.send(result);
  }
})

});

app.post("/addmenu", (req, res) => {

  const rest_id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const desc = req.body.description;
  const discount = req.body.discount;

        db.query(
        "INSERT INTO MENU (FOOD_NAME, FOOD_PRICE, DESCRIPTION, REST_ID, DISCOUNT) VALUES (?,?,?,?,?)",
        [name, price, desc, rest_id, discount],
        (err, result) => {
          if (err) {
            res.send({message:"Item not Inserted"});
          } else {
            res.send({message: "Item Inserted"});
          }
        }
      );
    });

app.post("/deletemenu", (req, res) => {
  
  const rest_id = req.body.id;
  const name = req.body.name;
      db.query(
        "SELECT * FROM MENU WHERE REST_ID = ? AND FOOD_NAME = ?",
        [rest_id, name],
        (err, result) => {
          if (err) {
            res.send({message:"Item does not exist"});
          } else {
            if (result.length > 0) {
              db.query(
                "DELETE FROM MENU WHERE REST_ID = ? AND FOOD_NAME = ?",
                [rest_id, name],
                (err, result) => {
                  if (err) {
                    res.send({message:"Item not Deleted"});
                  } else {
                    res.send({message: "Item Deleted"});
                  }
                }
              )
            }
            else
            {
              res.send({message: "Item does not exist"});
            }

          }
        }
      );

});

app.post("/selectedrestaurant", (req, res) => {
  
  const restaurant = req.body.restaurant;

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

});


app.post("/addtocart", (req, res) => {
  
  const restaurant = req.body.restname;
  const food = req.body.food_name;
  const price = req.body.food_price;
  const customer = req.body.id;
  const quantity = req.body.quantity;
  
  db.query(
    "SELECT * FROM MENU WHERE FOOD_NAME = ? AND REST_ID = (SELECT REST_ID FROM RESTAURANT WHERE REST_NAME = ?)", 
    [food,restaurant],
    (err,result) =>
    {
      if (err)
      {
        res.send({message : err})
      }
      else
      {
        db.query("INSERT INTO CART (CUST_ID, REST_ID, FOOD_ID, FOOD_NAME, QUANTITY, PRICE) VALUES (?,?,?,?,?,?)",
        [customer, result[0].REST_ID, result[0].FOOD_ID, food, quantity, price],
        (err,result2) =>
        {
          if(err)
          {
            res.send({message:err})
          }
          else
          {
            res.send({message: "added to cart"});
          }
        });
      }
    }
  );

});




app.post("/deletefromcart", (req, res) => {
  
  const restaurant = req.body.restaurant;
  const food = req.body.food;
  const customer = req.body.customer;
  

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

});


app.post("/customercart", (req, res) => {
  
  const customer = req.body.id;
  
      db.query(
        "SELECT * FROM CART WHERE CUST_ID = ?",
        [customer],
        (err, result) => {
          if (err) {
            // console.log("err")
            res.send({ err: err });
          } else {
            // console.log(result)
            if (result.length > 0) {
              res.send(result);
            } else {
              res.send({ message: "Could not display cart" });
            }
          }
        }
      );
});




app.post("/deletefromcustomercart", (req, res) => {
  
  const customer = req.body.id;
  const foodname = req.body.foodname;
  const quantity = req.body.quantity;
  
      db.query(
        "DELETE FROM CART WHERE CUST_ID = ? AND FOOD_NAME = ? AND QUANTITY = ?",
        [customer, foodname, quantity],
        (err, result) => {
          if (err) 
          {
            res.send({ message: err });
          } else 
          {
            res.send({ message: "success" });
          }
        }
      );
});

app.post("/placeorder", (req, res) => {
  const cust = req.body.id;
  const today = new Date();
  db.query("INSERT INTO ORDERS (CUST_ID, REST_ID, FOOD_ID, FINAL_PRICE , COUNT_ORDER) SELECT CUST_ID, REST_ID, FOOD_ID, PRICE*QUANTITY, QUANTITY FROM CART WHERE CUST_ID = ?",
  [cust], (err, result) =>{
    if (err)
    {
      console.log(err);
    }
    else
    {
      console.log("success");
    }
  });
  db.query("UPDATE ORDERS SET TIMENDATE = ?, STATUS_ORDER = 'PENDING' WHERE CUST_ID = ?",
  [today.getHours() + ":" + today.getMinutes(), cust],
  (err,result)=>{
    if(err)
    {
      console.log(err);
    }
    else
    {
      console.log("success");
    }
  });
  db.query("DELETE FROM CART WHERE CUST_ID = ?",[cust]);


});

app.post("/voucher", (req, res) => {
  
  // const restaurant = req.body.restaurant;
  const code = req.body.code;
  
  // db.connect((error) => {
  //   if (!error) {voucher
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
  
  const ordersid = req.body.orderID; 

  db.query("SELECT * FROM RIDER WHERE FREE = 1 LIMIT 1",
  [],(err,result)=>{
    if (err)
    {
      res.send({message:"Rider not free"})
    }
    else
    {
      if (result.length>0) 
      {
        const rider_id = result[0].RIDER_ID;
        db.query("UPDATE RIDER SET FREE = 0, ORDER_ID = ? WHERE RIDER_ID = ?", 
        [ordersid, rider_id], 
        (err, result2) => 
        {
          if (err)
          {
            res.send({message:"Rider not free"})
          }
          else
          {
            db.query("UPDATE ORDERS SET STATUS_ORDER = 'DELIVERING', RIDER_ID = ? WHERE ORDER_ID = ?", 
            [rider_id, ordersid],
            (err, result3)=>
            {
              if (err)
              {
                res.send({message:"Rider not free"})
              }
              else
              {
                res.send({message:"Order Confirmed"})
              }
            })
          }
      })
      
    }
    else
    {
      res.send({message:"Rider not free"})
    }
    }
  })
});


app.post("/deliverorder", (req, res) => {
  
  const order = req.body.order;
  
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

});







app.post("/orderdelivered", (req, res) => {
  
  const order = req.body.orderID;
  console.log(order);
  
      db.query(
        "UPDATE ORDERS SET STATUS_ORDER = 'COMPLETED' WHERE ORDER_ID = ?",
        [order],
        (err, result) => {
          if (err) {
            res.send({message: "Unable to Complete Order"});
          } else {
            db.query("UPDATE RIDER SET FREE = 1, ORDER_ID = NULL WHERE ORDER_ID = ?", 
            [order], 
            (err, result2) => {
              if (err) {
                res.send({ message: "Unable to Complete Order" });
              } else {
                res.send({ message: "Order Completed"});
              }
            });
          }
        }
      );



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
  const cust = req.body.id;
  //check if email doesnt exist
  db.query(
    "SELECT REST_NAME, STATUS_ORDER FROM RESTAURANT,ORDERS WHERE (RESTAURANT.REST_ID = ORDERS.REST_ID AND CUST_ID = ?)",
    [cust], (err, result)=>{
      // console.log(err||result);
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

app.post("/restorderhistory", (req, res) => {
  const rest = req.body.id;
  //check if email doesnt exist
  db.query(
    "SELECT ORDER_ID, FIRST_NAME, LAST_NAME, STATUS_ORDER FROM CUSTOMER,ORDERS WHERE (CUSTOMER.CUST_ID = ORDERS.CUST_ID AND REST_ID = ?)",
    [rest], (err, result)=>{
      // console.log(err||result);
      if (err)
      {
        res.send({message: "No Orders"});
      }
      else
      {
        // console.log(result);
        res.send(result);
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
          db.query(
            "UPDATE C_LOCATION SET AREA = ?, CITY = ?, STREET = ?, BUILDING = ? WHERE CUST_ID = ?",
            [area , city , street, building, cust_id],
            (err, result) => {
              if (err) {
                res.send({message:"Incorrect Values" });
              } else 
              {
                res.send({message: "Address Updated"})
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
  // console.log(email);
  // console.log(oldpassword);
  // console.log(newpassword);

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





app.post("/displaymenuforcustomer", (req, res) => {
  
  const restname = req.body.restname;
  db.query("SELECT * FROM MENU WHERE REST_ID = (SELECT REST_ID FROM RESTAURANT WHERE REST_NAME = ?)",
  [restname], 
  (err,result) => {
    if(err)
    {
      res.send({message:err})
    }
    else
    {
      res.send(result);
    }
  }) 

});




app.listen(process.env.PORT, () => {
  console.log("Server started at Port " + process.env.PORT);
  // console.log(db.state);
});
