const express = require('express');
const router = express.Router();
const { getAllApplication, changeStatus, getAllSlots, bookSlot ,adminLogin, adminVerify  } = require('../controller/adminApplication')


router.route('/get-applications').get(getAllApplication)
router.route('/change-status').post(changeStatus)
router.route('/slots').get(getAllSlots)
router.route('/bookSlots').post(bookSlot)
router.route('/login').post(adminLogin)
router.route('/verify').post(adminVerify)


module.exports = router
