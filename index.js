const express = require('express')
const app = express();
const routes = require('../billionlives-be/routes/index')
let cors = require('cors');

const dbConnector = require('./models');

dbConnector.sequelize.sync().then(() => {
  app.listen("8000", ()=>{
    console.log("PORT is running on 8000");
  })
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use("/api", routes);



// var secret = "841235432344ADRA";
// let crypto = require('crypto-js');

// var decrypter = require("./decrypt");

// app.get("/api/welcome", (req, res) => {
//   // res.send("Billion Lives Backend Project")
//   if (req.query.username == "Saras" && req.query.password == "qwerty") {
//     var json = { "name": "Saras", "mobile": "99999999" };
//     // res.send("Login successful");
//     res.json({ "status": true, "message": "Login Succesful", result: json });
//   } else {
//     res.send("Invalid Credentials");
//   }
// })


// var users = [];

// var id = 0;

// app.post("/api/user", (req, res) => {
//   var name = req.body.name;
//   var email = req.body.email;
//   var mob = req.body.mob_no;
//   var password = req.body.password;

//   // if (users.length > 0) {
//   //   for (var user of users) {
//   //     if (user.email == email) {
//   //       res.json({ status: false, message: "Email already exists" });
//   //       return;
//   //     }
//   //   }
//   // }

//   // var newUser = {
//   //   "id": id,
//   //   "name": name,
//   //   "email": email,
//   //   "mob": mob,
//   //   "password": password,
//   // }
//   // id++
//   // users.push(newUser);

//   // var query = "INSERT INTO USER(name, email, password, username, mobile) VALUES ('" + name + "','" + email + "','" + password + "',''," + mob + ")";


//   var query  = "SELECT * FROM USER";

//   dbConnector.perfromDBOperation(query, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.json({ status: false, message: "User not added successfully" })
//     } else {
//       console.log(result);
//       res.json({ status: true, message: "User added successfully" })
//     }
//   })


// })

// app.get("/api/user", (req, res) => {

//   var name = req.query.name;
//   if (name != undefined && name != null && name != "") {
//     for (var user of users) {
//       if (user.name == req.query.name) {
//         res.json({ status: true, message: "user detail found", result: user });
//         return;
//       }
//     }
//     res.json({ status: false, message: "There is no any such user" });
//   } else {
//     res.json({ status: true, message: "User details", result: users });
//   }
// })


// app.put("/api/user", (req, res) => {
//   var id = parseInt(req.body.id)
//   var email = req.body.email
//   var name = req.body.name
//   var password = req.body.password
//   var mob = req.body.mob_no

//   for (var user of users) {
//     if (user.id == id) {
//       var updatedUser = {
//         id: id,
//         "email": email,
//         "name": name,
//         "password": password,
//         "mob": mob
//       }

//       users.pop(user);
//       users.push(updatedUser);
//       res.json({ status: true, message: "user data updated" });
//       return
//     }
//   }

//   res.json({ status: false, message: "invalid user id" });
// })


// app.post("/login", decrypter.decryptBody, (req, res) => {
//   console.log("body", req.body);
//   res.json({ status: true, message: "decryptor API called" });
// })

//GET -> 
//POST -> Data addition
//PUT -> Data updation
//PATCH -> Data updation for the particular column/field
//DELETE -> for data deletion

//Assignment 1 - Create a Login API and implement validations. 

//Assignment 2 - Create APIs for the UI implemented in the React Project and map it to the UI. 

//Assignment 3 - Create a postman environment to send the payload as decrypted data for POST and PUT method only.

//Assignment 4 - Create a new MySQL database. And replace the API methods implemented using local array to Database.

//Assignment 5 - Create a folder structure to redirect API calls from index.js to corresponding folder, 
//Add the sequelize library and connect the DB and perform insert and view operation
