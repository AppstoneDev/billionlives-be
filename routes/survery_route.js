const express = require('express')

const app = express.Router()

const server = require('../mongodbConnector')
const collection = require('../collection')
const router = require('.')

//YYYY-MM-DDThh:mm:ss.sssZ

app.post('/add_survey', (req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body))
    if (req.body.hasOwnProperty("survey_name")
        && req.body.hasOwnProperty("survey_description")) {

        var newSurveyItem = {
            survey_name: req.body.survey_name,
            survey_description: req.body.survey_description,
            survey_start_date: req.body.survey_start_date == null || req.body.survey_start_date == "null"
                ? null : new Date(req.body.survey_start_date),
            survery_end_date: new Date(req.body.survery_end_date),
            created_on: new Date()
        }

        server.collection(collection.dbb.SURVEY).insertOne(newSurveyItem, (err, doc) => {
            if (err) {
                res.json({ status: false, message: err });
            } else {
                res.json({ status: true, message: "Data inserted successfully", result: doc.insertedID })
            }
        })

    

    } else {
        if (req.body.hasOwnProperty("survey_name") == false) {
            res.json({ status: false, message: "Survey Name parameter missing" });
        } else if (req.body.hasOwnProperty("survey_description") == false) {
            res.json({ status: false, message: "Survery Description parameter missing" });
        }
    }
})

module.exports = app;