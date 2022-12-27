const mongoose = require('mongoose');
const collection = require("../util/collection");

const applicationSchema = mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String
    },
    company: {
        type: String
    },
    describe: {
        type: String
    },
    products: {
        type: String
    },
    problem: {
        type: String

    },
    solution: {
        type: String
    },

    customer: {
        type: String
    },
    strategy: {
        type: String
    },
    advantage: {
        type: String
    },
    revenue: {
        type: String
    },
    proposal: {
        type: String
    },
    type: {
        type: String
    },
    status: {
        type: String,
        default: "New"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: collection.userModel,
    },
    bookingStatus: {
        type: Boolean,
        default: false
    },
    slotNum: {
        type: String,
        default: "Not allocated"
    },
    section: {
        type: String,
        default: "Not allocated",
    },
    slotCode:{
        type:mongoose.Types.ObjectId,
        ref:collection.slotModel,
    }

})
module.exports = mongoose.model(collection.applicationModel, applicationSchema)