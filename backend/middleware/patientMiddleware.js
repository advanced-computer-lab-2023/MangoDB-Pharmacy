const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
const dotenv = require("dotenv").config();
const JWT_SECRET = 'abc123';
const protectPatient = asyncHandler( async (req,res, next) => {
    let token
   // console.log ("middle ware" ,req.headers.authorization)     ;       

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
           // console.log ("middleware 1")     ;       

       token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, JWT_SECRET)

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