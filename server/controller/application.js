const applicationModel = require("../models/applicationModel");
const { asyncWrapper } = require('../middlewares/asyncwrapper');
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");
require('dotenv').config()

const getUser = async (token) => {
    try {
        const jwtToken = jwt.verify(token, process.env.SECRET_TOKEN)
        const userId = jwtToken.userId;
        const user = await userModel.findOne({ _id: userId })
        return user;
    } catch (err) {
        throw Error('Invalid token')
    }
}

module.exports = {
    createApplication: asyncWrapper(async (req, res) => {
        const user = await getUser(req.cookies.jwt)
        req.body.userId = user._id
        const application = await applicationModel.create(req.body)
        const users = await userModel.updateOne({ _id: user._id }, { $set: { application: true } })
        res.status(201).json({ status: true })
    }),
    getUserDetails: asyncWrapper(async (req, res) => {
        const user = await getUser(req.cookies.jwt)
        res.status(200).json({ status: true, user: user })
    }),

    getUserApplication: asyncWrapper(async (req, res) => {
        const userId = req.params.id
        console.log(userId);
        const application = await applicationModel.findOne({ userId: userId })
        if (application) {
            res.status(200).json({ status: true, application: application })
        } else {
            throw Error('No application ')
        }
    }),
}