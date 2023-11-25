const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Pharmacist = require('../models/pharmacistModel')
const dotenv = require("dotenv").config();

const protectPharmacist = asyncHandler( async (req,res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, "abc123")

            const pharmacist = await Pharmacist.findById(decoded.id)

            if(!pharmacist){
                res.status(401)
                throw new Error('Unauthorized')
            }

            req.user = pharmacist

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

module.exports = {protectPharmacist}