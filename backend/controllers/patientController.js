const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel')
const Medicine = require('../models/medicineModel');
const Pharmacist = require('../models/pharmacistModel')

//const asyncHandler = require('express-async-handler')

//view a list of all available medicine 
const viewMed= asyncHandler( async (req,res) =>{
    try {
      const medicines= await Medicine.find()
  
      // Extract the name and mobile and bla bla  from each patient document
      // const medInfo = medicines.map(medicine => ({
      //     id: medicine.__id,
      //     picture: medicine.picture,
      //     price: medicine.price,
      //     description: medicine.description,
      // }));
  
      // res.status(200).json(medInfo);
      res.status(200).render('Patient/index', { meds: medicines });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
  

    //res.status(200).json(medicine)
  })

  const searchFilter = asyncHandler (async (req, res) => {
    try {
      const { search, use } = req.query;
      const query = {};
      if (search) {
        query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
      }
        //And OR
      if (use) {
        // query.use = use;
        query.use = { $regex: use, $options: 'i' }
      }

      // Fetch medicines based on the query
      const medicines = await Medicine.find(query);

      // Return the filtered medicines
      res.json(medicines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wrong parameters' });
    }
  });

  
//search medicine based on name 
// const searchMedicineByName = asyncHandler(async (req, res) => {
//     const medName = req.params.name; // Assuming you pass the name in the URL parameter
  
//     try {
//         const medicines = await Medicine.find({
//             name: { $regex: new RegExp(medName, 'i') } // 'i' for case-insensitive search
  
  
//         });
  
//         if (medicines.length === 0) {
//             res.status(404).json({ message: 'medicine not found' });
//             return;
//         }
  
//         res.status(200).json(medicines);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
//   });
  
  
  module.exports = 
  { viewMed, searchFilter
    }
  

