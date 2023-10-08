const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['hired', 'pending', 'rejected'],
        default: "pending"
    },
}, { timestamps: true });

const pharmacistModel = mongoose.model('Pharmacist', pharmacistSchema);
module.exports = pharmacistModel;