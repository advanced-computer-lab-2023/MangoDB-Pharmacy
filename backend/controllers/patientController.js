const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
const Medicine = require('../models/medicineModel');

const asyncHandler = require('express-async-handler')

//view a list of all available medicine 
const viewMed= asyncHandler( async (req,res) =>{
    try {
      const medicine= await Medicine.find()
  
      // Extract the name and mobile and bla bla  from each patient document
      const medInfo = medicine.map(medicine => ({
          picture: medicine.picture,
          price: medicine.price,
          description: medicine.description,
      }));
  
      res.status(200).json(medInfo);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
  
    
    res.status(200).json(medicine)
  })
  
  module.exports = 
  { viewMed}
  

