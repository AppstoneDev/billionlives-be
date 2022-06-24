const express = require('express');
const router = express.Router();

const userRoute = require('../routes/user_route');


router.use("/v1", userRoute);

module.exports = router;