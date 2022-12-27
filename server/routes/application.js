const express = require('express');
const router = express.Router();
const { createApplication, getUserDetails, getUserApplication } = require('../controller/application')

router.route('/add-application').post(createApplication)
router.route('/get-user').post(getUserDetails)
router.route('/get-application/:id').post(getUserApplication)




module.exports = router