const mongoose = require('mongoose');
const User = require('./userModel')
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
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

// const pharmacistModel = mongoose.model('Pharmacist', pharmacistSchema);

const Pharmacist = User.discriminator('Pharmacist', pharmacistSchema)

module.exports = Pharmacist;