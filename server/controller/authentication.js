const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const { asyncWrapper } = require("../middlewares/asyncwrapper");


const maxAge = 60 * 60 * 24;

module.exports = {
    register: asyncWrapper(async (req, res) => {
        const { email, name, password } = req.body
        const crypt = await bcrypt.hash(password, 10)
        const sameEmail = await userModel.findOne({ email: email })
        if (sameEmail) {
            throw Error("Email already exist ")
        } else {
            const user = await userModel.create({ name, email, password: crypt })
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, { expiresIn: maxAge })
            res.cookie("jwt", token, {
                withCrdentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000
            });
            res.status(201).json({ userId: user._id, status: true });
        }
    }
    ),

    login: asyncWrapper(async (req, res) => {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (user.status) {
            throw Error('User is blocked ')
        }
        if (user) {
            const use = await bcrypt.compare(password, user.password)
           
            if (use) {
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, { expiresIn: maxAge })
                res.cookie("jwt", token, {
                    withCrdentials: true,
                    httpOnly: false,
                    maxAge: maxAge * 1000
                });

                res.status(200).json({ userId: user._id, status: true, user: user });
            } else {
                throw Error("Invalid password");
            }
        } else {

            throw Error("Invalid email");

        }
    }
    ),
}

