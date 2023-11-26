const express = require("express");
const adminController = require("../controllers/adminController");
const pharmacistModel = require("../models/pharmacistModel");

const router = express.Router();

const { protectAdmin } = require("../middleware/adminMiddleware");

router.get("/", (req, res) => {
  res.render("../views/adminHome");
});

router.get("/query", adminController.searchFilter);
router.get("/viewMed", adminController.viewMed);
router.get("/viewPharmacistInfo/:id", adminController.viewPharmacistInfo);
router.get("/viewAllPharmacists", adminController.viewAllPharmacists);
router.get("/viewAllPatients", adminController.viewAllPatients);
router.get("/getPatientsBasicInfo/:id", adminController.getPatientsBasicInfo);
router.post("/addAdmin", adminController.add_admin);
router.post("/addPharma", adminController.add_pharmacist);
router.post("/login", adminController.loginAdmin);
router.post("/pharmacist-approval/:id", adminController.pharmacistApproval);
router.post("/pharmacist-rejection/:id", adminController.pharmacistRejection);
router.post("/verify-otp", adminController.verifyOTP);
router.post("/reset-password", adminController.resetPassword);
router.delete("/deletePharma/:id", adminController.deletePharmacist);
router.delete("/deletePatient/:id", adminController.deletePatient);
router.get("/getPendingPharma", adminController.getPendingPharma);
router.get("/:id", adminController.viewPharmacistInfo);
router.post("/request-otp", adminController.sendOTP);

// router.get('/', (req, res) => {
//     res.status(200).render('Admin/Home');
//   });
//router.get('/:name' , adminController.searchMedicineByName)


router.post("/change-password", protectAdmin, adminController.changePassword);

module.exports = router;
