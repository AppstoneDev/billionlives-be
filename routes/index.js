const express = require('express');
const router = express.Router();

const userRoute = require('../routes/user_route');
const surveryRoute = require('../routes/survery_route');


router.use("/v1", userRoute);
router.use("/v1/", surveryRoute);

module.exports = router;