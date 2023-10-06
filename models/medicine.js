const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    use: {
        type: String,
        required: true
    },
    pic: {
        type: Image,
        required: true
    }
});

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;