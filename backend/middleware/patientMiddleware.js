const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
const dotenv = require("dotenv").config();

const protectPatient = asyncHandler( async (req,res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
        console.log ("the token", token)
            // Verify token
            const decoded = jwt.verify(token, "abc123")

            const patient = await Patient.findById(decoded.id)

            if(!patient){
                res.status(401)
                throw new Error('Unauthorized')
            }

            req.user = patient

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Error: Unauthorized')
        }
    }

    if (!token){
        res.status(401)
        throw new Error('No Token')
    }
})

module.exports = {protectPatient}