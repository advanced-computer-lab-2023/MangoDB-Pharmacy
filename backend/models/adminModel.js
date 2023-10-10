//const mongoose = require('mongoose')

/*const adminSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: [true, "Please Enter Your First Name"]
    },
    lastName: {
        type: String,
        required: [true, "Please Enter Your Last Name"]
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Admin', adminSchema)
*/
const mongoose = require('mongoose')

const emailValidator = function (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

const adminSchema = mongoose.Schema({
    username: {
        type: String,
        required: [false],
         unique: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        validate: [emailValidator, "Invalid email address format"],
        unique: true
    },
    password: {
        type: String,
        required: [false]
    },
    firstName: {
        type: String,
        required: [true, "Please Enter Your First Name"]
    },
    lastName: {
        type: String,
        required: [true, "Please Enter Your Last Name"]
    },
    role: {
        type: String,
        default: "admin"
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Admin', adminSchema)