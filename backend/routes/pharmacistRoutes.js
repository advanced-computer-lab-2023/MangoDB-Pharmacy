const express = require("express");
const pharmacistController = require("../controllers/pharmacistController");
const router = express.Router();
const Medicine = require("../models/medicineModel");

const upload = require('../middleware/upload')
const {protectPharmacist} = require('../middleware/pharmacistMiddleware')

// Multer configuration

// router.get('/:id' , (req,res) => {
//     res.status(200).json({message: 'Weselt'})
// })
router.get("/", (req, res) => {
  res.render("../views/pharmaHome");
});
//upload.single('picture'),
router.post("/addMedicine",upload.single('picture'), pharmacistController.addMedicine);

router.get("/addMedicine", (req, res) => {
  res.render("Pharmacist/addMedicine");
});

// router.get('/', pharmacistController.home)

router.post('/login', pharmacistController.loginPharmacist)
router.get('/request-otp', protectPharmacist, pharmacistController.sendOTP)
router.post('/verify-otp', protectPharmacist, pharmacistController.verifyOTP)
router.post('/reset-password', protectPharmacist, pharmacistController.resetPassword)

router.get("/viewMed", pharmacistController.viewMed);
router.get("/getMed", pharmacistController.getMedicine);
//test
router.get("/medDetails/:id", pharmacistController.getDetails);
//test
router.get("/query", pharmacistController.searchFilter);
// router.put('/:id ', pharmacistController.editMedPrice)
router.put("/updateMed/:id", pharmacistController.editMedPrice);
// router.get('/:name' , pharmacistController.searchMedicineByName)


router.get('/getPharmacists',pharmacistController.viewPharmacists);
router.get('/getPharmacist/:id', pharmacistController.getPharmacist);



module.exports = router;
