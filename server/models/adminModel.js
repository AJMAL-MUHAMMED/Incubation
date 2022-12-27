const mongoose = require('mongoose');
const collection = require('../util/collection')

const adminSchema = mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model(collection.adminModel, adminSchema)