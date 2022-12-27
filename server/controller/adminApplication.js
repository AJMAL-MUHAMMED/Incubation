const applicationModel = require("../models/applicationModel");
const { asyncWrapper } = require('../middlewares/asyncwrapper');
const slotModel = require("../models/slotModel");
const adminModel = require("../models/adminModel");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const maxAge = 60 * 60 * 24


module.exports = {

    getAllApplication: asyncWrapper(async (req, res) => {
        const applications = await applicationModel.find({}).lean()
        res.status(200).json({ status: true, applications: applications })
    }),

    changeStatus: asyncWrapper(async (req, res) => {
        const status = req.body.status;
        const applicationId = req.body.applicationId;
        const change = await applicationModel.updateOne({ _id: applicationId }, { $set: { status: status } })
        res.status(200).json({ status: true })
    }),

    getAllSlots: asyncWrapper(async (req, res) => {
        const slots = await slotModel.find({})
        res.status(200).json({ status: true, slots: slots })
    }),

    bookSlot: asyncWrapper(async (req, res) => {
        console.log(req.body);
        const { applicationId, slotSection, slotId, slotNumber } = req.body;
        const application = await applicationModel.updateOne({ _id: applicationId }, { $set: { slotCode: slotId, section: slotSection, slotNum: slotNumber, status: "Booked", bookingStatus: true } })
        const companySlot = await slotModel.updateOne({ _id: slotId }, { $set: { selected: true, companyname: application.company, user_email: application.email } })
        res.status(200).json({ status: true })
    }),

    adminLogin: asyncWrapper(async (req, res) => {
        const { email, password } = req.body
        const admin = await adminModel.findOne({ email: email, password: password })
        console.log(admin, req.body);
        if (admin) {
            const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_TOKEN, { expiresIn: maxAge })
            res.status(200).json({ status: true, token: token })
        } else {
            throw Error('Invalid credentials')
        }
    }),

    adminVerify: asyncWrapper(async (req, res) => {
        const token = req.body.token;
        if (token) {
            try {
                const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN)
                res.status(200).json({ status: true })
            } catch (error) {
                throw Error("Invalid token")
            }

        } else {
            throw Error('Invalid token')

        }
    }) 


}