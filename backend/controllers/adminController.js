const Admin = require('../models/adminModel');
const Pharmacist = require('../models/pharmacistModel');
const Patient = require('../models/patientModel');
const Medicine = require('../models/medicineModel');

const asyncHandler = require('express-async-handler')



const add_admin = (req, res) => {
    // create a new Admin instance
    const admin = new Admin(req.body);

    const randomUsername = generateRandomUsername();
    const randomPassword = generateRandomPassword();
    console.log('Username:', randomUsername)
    console.log('Password:', randomPassword)
    admin.username = randomUsername
    admin.password = randomPassword

    admin.save()
    .then((result) => console.log('NEW ADMIN ADDED:', result))
    .catch((err) => console.log(err));

    console.log(admin.username,  admin.password)
    res.status(201).json({ message: req.body });

   
    
};
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
  function generateRandomUsername() {
    const usernameLength = 8;
    return generateRandomString(usernameLength);
  }
  
  function generateRandomPassword() {
    const passwordLength = 12;
    return generateRandomString(passwordLength);
  }
const add_pharmacist = (req, res) => {
  const pharmacist = Pharmacist.findOneAndUpdate("", { status: "hired" })
                               .then((result) => {
                                  res.status(201).json({ message: 'pharmacist info reached line 26 successfully' });
                               })
                               .catch((err) => console.log(err));
    // Create a new Pharmacist instance
    // const pharmacist = new Pharmacist(req.body);
    // console.log(pharmacist.username,  pharmacist.password)
    // save the pharmacist to the database
//    
}

const deletePharmacist = asyncHandler(async(req, res) => {
    try {
        const { username } = req.body; // Remove .text since it's not a nested object
    
        if (!username) {
          return res.status(400).json({ error: 'Username is required in the request body' });
        }
    
        const deletedPharmacist = await Pharmacist.findOneAndDelete({ username });
    
        if (!deletedPharmacist) {
          return res.status(404).json({ error: 'Pharmacist not found' });
        }
    
        return res.json({ message: 'Pharmacist deleted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the pharmacist' });
      }
 
});

const deletePatient = asyncHandler(async(req, res) => {
    try {
        const { username } = req.body; // Remove .text since it's not a nested object
    
        if (!username) {
          return res.status(400).json({ error: 'Username is required in the request body' });
        }
    
        const deletedPatient = await Patient.findOneAndDelete({ username });
    
        if (!deletedPatient) {
          return res.status(404).json({ error: 'Patient not found' });
        }
    
        return res.json({ message: 'Patient deleted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the Patient' });
      }
 
});
const getPendingPharma = asyncHandler(async(req, res) => {
    try {
        const pendingPharmacists = await Pharmacist.find({ status: 'pending' });
    
        if (pendingPharmacists.length === 0) {
          return res.status(404).json({ error: 'No pharmacists with pending status found' });
        }
    
        return res.json(pendingPharmacists);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while retrieving pharmacists' });
      }
 
});


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

  
  //res.status(200).json(medicine)
})


//find by id 
//view pharmacist info
const viewPharmacistInfo= asyncHandler( async (req,res) =>{
  try {
    const  pharmacistId  = req.params.id;
    const pharmacist = await Pharmacist.findById(pharmacistId);
    if(!pharmacist){
       return res.status(404).json({ message: 'Pharmacist not found' });
    }
    res.status(200).json(pharmacist)
  }catch(error){
    res.status(500).json({error: err.message})

  }
  // const pharmacist= await Pharmacist.find()
  // res.status(200).json(pharmacist)
})
//view all 3shan el frontend 
const viewAllPharmacists= asyncHandler( async (req,res) =>{
      const pharmacist= await Pharmacist.find()
      res.status(200).json(pharmacist)
})



//get patient basic info
//ntla3 kolo w n5tar
//hyd5al el id  
const getPatientsBasicInfo = asyncHandler(async (req, res) => {
  // try {
  //   const { patientId } = req.params;
  //   const patient = await Patient.findById(patientId);

  //   // Check if the patient exists
  //   if (!patient) {
  //     return res.status(404).json({ message: 'Patient not found' });
  //   }
  //   const patientInfo = {
  //     name: patient.name,
  //     username: patient.username,
  //     mobile: patient.mobile,
  //     dob: patient.dob,
  //     gender: patient.gender,
  //   };

  //   res.status(200).json(patientInfo);
  // } catch (error) {
  //   res.status(500).json({ error: err.message });
  // }

  try {
    const patients = await Patient.find();

    // Extract the name and mobile and bla bla  from each patient document
    const patientsInfo = patients.map(patient => ({
        firstName: patient.firstName,
        lastName: patient.lastName,
        username: patient.username,
        mobile: patient.mobile,
        dob: patient.dob,
        gender: patient.gender,
    }));

    res.status(200).json(patientsInfo);
} catch (error) {
    res.status(500).json({ message: 'Server error' });
}
});

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
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = { add_admin, 
  add_pharmacist, 
  deletePharmacist,
   deletePatient, 
   getPendingPharma,
   getPatientsBasicInfo,
   viewPharmacistInfo,
   viewMed,
   searchFilter,
   viewAllPharmacists
   };