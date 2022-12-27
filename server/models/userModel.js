const mongoose = require("mongoose")
const collection = require("../util/collection")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    application: {
        type: Boolean,
        default: false,
    },

    status: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model(collection.userModel, userSchema);