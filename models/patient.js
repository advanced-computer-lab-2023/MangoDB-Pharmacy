const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
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
    gender: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    emergency_contact: {
        fullName: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        relation: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;