const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

const { protectPatient } = require("../middleware/patientMiddleware");

router.get("/", (req, res) => {
	res.render("../views/patientHome");
});

router.get("/viewMed", patientController.viewMed);
router.get("/getMed/:id", patientController.getMed);

router.get('/query', patientController.searchFilter)
router.post('/request-otp', patientController.sendOTP)
router.post('/addMedicineInCart',protectPatient, patientController.addMedicineToCart)
router.post('/createPatient', patientController.createPatient);
router.get('/getPatients',patientController.getPatients);
router.post('/changeCartItemAmount' ,protectPatient, patientController.changeCartItemAmount)
router.post('/addAddress',protectPatient , patientController.addAddress)
router.post('/login' , patientController.loginPatient)
router.post('/verify-otp', patientController.verifyOTP)
router.post('/reset-password', patientController.resetPassword)
router.get('/viewListOfOrders',protectPatient, patientController.viewListOfOrders);
router.get('/viewOrderDetails/:id', patientController.viewOrderDetails);
router.post('/cancelOrder/:id', patientController.cancelOrder);


router.get('/viewCartItems',protectPatient , patientController.viewCartItems)
router.delete('/removeCartItems',protectPatient , patientController.removeCartItems)
router.post('/checkout',protectPatient , patientController.checkout)
router.get('/addressesByPatientId',protectPatient , patientController.addressesByPatientId)
router.get('/getMeds',patientController.getMeds);
router.get('/getMedicinesByUse',patientController.getMedicinesByUse);
router.get('/getAllMedicineUses',patientController.getAllMedicineUses);
router.post('/payFromWallet',protectPatient, patientController.payFromWallet);
router.post('/createWallet', patientController.createWallet);

router.post('/getPatient', patientController.getPatient);
router.post("/change-password", protectPatient, patientController.changePassword);


module.exports = router
