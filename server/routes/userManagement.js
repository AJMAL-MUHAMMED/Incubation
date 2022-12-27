const express = require('express');
const router = express.Router()

const { getAllUser, updateUser } = require('../controller/userManagement');
const { route } = require('./application');

router.route('/get-all-user').get(getAllUser);
router.route('/update-user/:id').post(updateUser);


module.exports = router;