const Medicine = require("../models/guestModel");
const Patient = require("../models/patientModel");
const Pharma = require("../models/pharmacistModel");

// const get_medicine = (req, res) => {
//     Medicine.find()
//             .then()
//             .catch()
// }

const regPatientView = (req, res) => {
  res.status(200).render("patientRegistration");
};
const regPatient = (req, res) => {
  const body = { ...req.body, userType: "patient", accountStatus: "inactive" };
  const patient = new Patient(body);

  patient
    .save()
    .then((result) => {
      console.log("NEW PATIENT ADDED:", result);
      res.status(201).json({ message: req.body });
    })
    .catch((err) => console.log(err));

  //console.log(patient.username,  patient.password)
};

const regPharma = (req, res) => {
  // create a new Admin instance
  const body = { ...req.body, userType: "pharmacist" };
  const pharma = new Pharma(body);

  pharma
    .save()
    .then((result) => {
      console.log("NEW PHARMACIST ADDED:", result);
      res.status(201).json({ message: req.body });
    })
    .catch((err) => console.log(err));

  //console.log(patient.username,  patient.password)
};

module.exports = { regPatient, regPharma, regPatientView };
