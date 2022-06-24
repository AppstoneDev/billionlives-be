const express = require('express');
const app = express.Router();

const { Userdetails } = require("../models")


app.post("/user", (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.body.hasOwnProperty("name")
    && req.body.hasOwnProperty("email")) {

    Userdetails.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile
    }).then(() => {
      res.json({ status: true, message: "Data inserted successfully" })
    }).catch((err) => {
      res.json({ status: false, message: "Error occured while inserting " + err });
    })
  } else {
    if (!req.body.hasOwnProperty("name")) {
      res.json({ status: false, message: "name parameter is missing" });
    } else if (!req.body.hasOwnProperty("email")) {
      res.json({ status: false, message: "email parameter is missing" });
    }
  }
})


app.get("/user", (req, res) => {
  Userdetails.findAll({where : {name : "Akash"}})
    .then((users) => {
      res.json({ status: true, message: "user details found", result: users });
    }).catch((err) => {
      res.json({ status: false, message: "Error occured while retrieving data " + err });
    })
})




module.exports = app;