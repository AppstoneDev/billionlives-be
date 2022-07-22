const express = require('express');
const app = express.Router();

const { Userdetails } = require("../models");
const { Usergroup } = require('../models');
const { models } = require('../models')

const dbConnector = require('../dbconnector');
const db = require('../models');

const mongodb = require("../mongodbConnector")
const collection = require("../collection")


//survey_name, survery_description, survey_start_date, survery_end_date and created_on

app.post("/user", (req, res) => {
  req.body = JSON.parse(JSON.stringify(req.body))
  if (req.body.hasOwnProperty("name")
    && req.body.hasOwnProperty("email")) {


      
      

    // Userdetails.create({
    //   name: req.body.name,
    //   email: req.body.email,
    //   mobile: req.body.mobile,
    //   group_id: req.body.group_id
    // }).then(() => {
    //   res.json({ status: true, message: "Data inserted successfully" })
    // }).catch((err) => {
    //   res.json({ status: false, message: "Error occured while inserting " + err });
    // })

    var query = "";

    dbConnector.dbServer.transaction(query, function(error){
      if(error){
        res.json({status:false, message: "Error occured "+error});
      }

      var query1 = "IS for performing operation in the UserDetails"
      dbConnector.perfromDBOperation(query, (error1, result, fields) =>{
        if(error1){
          dbConnector.dbServer.rollBack()
        }

        var query2 = "Is for inserting into the User Groups Table"

        dbConnector.perfromDBOperation(query2, (error2, result1, fields) =>{
          if(error2){
          dbConnector.dbServer.rollBack();
          } 

          dbConnector.dbServer.commit();
        } )
      })
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

  //Userdetails - primary table
  //Usergroup - secondary table



  Usergroup.belongsTo(Userdetails, { foreignKey: 'id', targetKey: 'group_id' })
  Userdetails.hasMany(Usergroup, { foreignKey: 'id', sourceKey: 'group_id' })

  Userdetails.findAll({
    attributes: ['id', 'name', 'email', 'mobile'],
    include: [
      {
        model: Usergroup,
        attributes: ['id', 'name']
      }
    ]
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