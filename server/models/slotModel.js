const mongoose = require('mongoose');
const collection = require('../util/collection')

const slotSchema = new mongoose.Schema({
    section: { type: String },
    selected: { type: Boolean, default: false },
    slot_no: { type: Number },
    companyname: { type: String },
    user_email: { type: String },
})

module.exports = mongoose.model(collection.slotModel, slotSchema);