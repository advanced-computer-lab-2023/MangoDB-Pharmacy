const Medicine = require('../models/guestModel');
const Patient = require('../models/patientModel');
const Pharma = require('../models/pharmacistModel');
const get_medicine = (req, res) => {
    Medicine.find()
}

const regPatient = (req, res) => {
    // create a new Admin instance
    const patient = new Patient(req.body);

   
    

    patient.save()
    .then((result) => console.log('NEW PATIENT ADDED:', result))
    .catch((err) => console.log(err));

    //console.log(patient.username,  patient.password)
    res.status(201).json({ message: req.body });

   
    
};

const regPharma = (req, res) => {
    // create a new Admin instance
    const pharma = new Pharma(req.body);

   
    

    pharma.save()
    .then((result) => console.log('NEW PHARMACIST ADDED:', result))
    .catch((err) => console.log(err));

    //console.log(patient.username,  patient.password)
    res.status(201).json({ message: req.body });

   
    
};
module.exports = { get_medicine, regPatient, regPharma };