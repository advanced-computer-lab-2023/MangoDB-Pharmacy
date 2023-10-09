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

//search medicine based on name 
const searchMedicineByName = asyncHandler(async (req, res) => {
    const medName = req.params.name; // Assuming you pass the name in the URL parameter
  
    try {
        const medicines = await Medicine.find({
            name: { $regex: new RegExp(medName, 'i') } // 'i' for case-insensitive search
  
            //idk la2etha keda :)
            //The $regex operator is used to perform a regular expression search on the name field.
            // The 'i' option in the regex makes the search case-insensitive.
  
  
        });
  
        if (medicines.length === 0) {
            res.status(404).json({ message: 'medicine not found' });
            return;
        }
  
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
  });
  
  
  module.exports = 
  { viewMed,
    searchMedicineByName,
    }
  

