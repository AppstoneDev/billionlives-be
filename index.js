const express = require('express')
const app = express();



app.listen("8000", ()=>{
  console.log("PORT is running on 8000");
})

app.get("/api/welcome", (req, res)=>{
  // res.send("Billion Lives Backend Project")
  if(req.query.username== "Saras" && req.query.password == "qwerty"){
    var json ={"name" : "Saras", "mobile" : "99999999"}; 
    // res.send("Login successful");
    res.json({"status": true, "message": "Login Succesful", result: json});
  }else{
    res.send("Invalid Credentials");
  }
})


//GET -> 
//POST -> Data addition
//PUT -> Data updation
//PATCH -> Data updation for the particular column/field
//DELETE -> for data deletion

//Assignment 1 - Create a Login API and implement validations. 
