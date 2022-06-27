const express = require('express');
const app = express.Router();

const { Userdetails } = require("../models");
const { Usergroup } = require('../models');
const { models } = require('../models')


app.post("/user", (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.body.hasOwnProperty("name")
    && req.body.hasOwnProperty("email")) {

    Userdetails.create({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      group_id: req.body.group_id
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
  // Userdetails.belongsTo(Usergroup, { targetKey: 'id', foreignKey: 'group_id' });

  // Userdetails.associate((models) => {
  //   Userdetails.hasOne(models.Usergroup, {
  //     foreignKey : group_id,
  //     as : "group_details"
  //   })
  // })
  Userdetails.associate = function (models) {
    Userdetails.hasOne(models.Usergroup, {
      foreignKey: group_id,
      as: "group_details"
    })
  }
  Userdetails.findAll({
    // include: [
    //   {
    //     model: Usergroup,
    //     where: { "id": Userdetails.group_id }
    //   }
    // ]
  })
    .then((users) => {
      res.json({ status: true, message: "user details found", result: users });
    }).catch((err) => {
      res.json({ status: false, message: "Error occured while retrieving data " + err });
    })
})

app.put("/user", (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.body.hasOwnProperty("id")) {

    var id = parseInt(req.body.id)

    delete req.body["id"]

    Userdetails.update(
      req.body,
      { where: { "id": id } }
    ).then(() => {
      res.json({ status: true, message: "Recorded updated successfully" });
    }).catch((err) => {
      res.json({ status: false, message: "Error occurred while updating " + err });
    })
  } else {
    res.json({ status: false, message: "id parameter is missing" });
  }
})


app.delete("/user", (req, res) => {
  Userdetails.destroy(
    { where: { id: req.body.id } }
  ).then(() => {
    res.json({ status: true, message: "Record Deleted successfully" });
  }).catch((err) => {
    res.json({ status: false, message: "Error occurred while deleting " + err });
  })
})




module.exports = app;