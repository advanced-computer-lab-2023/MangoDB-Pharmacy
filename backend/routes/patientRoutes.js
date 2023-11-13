const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patientController');

const {protectPatient} = require('../middleware/patientMiddleware')

router.get("/", (req, res) => {
    res.render("../views/patientHome");
  });

router.get('/viewMed', patientController.viewMed)
router.get('/getMed/:id', patientController.getMed)

router.get('/query' , patientController.searchFilter)
router.get('/request-otp' , protectPatient, patientController.sendOTP)
router.post('/addMedicineInCart', patientController.addMedicineToCart)
router.post('/createPatient', patientController.createPatient);
router.get('/getPatients',patientController.getPatients);
router.post('/changeCartItemAmount/:id' , patientController.changeCartItemAmount)
router.post('/addAddress/:id' , patientController.addAddress)
router.post('/login' , patientController.loginPatient)
router.post('/verify-otp' , protectPatient, patientController.verifyOTP)
router.post('/reset-password' , protectPatient, patientController.resetPassword)
router.get('/viewListOfOrders', patientController.viewListOfOrders);
router.get('/viewOrderDetails/:id', patientController.viewOrderDetails);
router.post('/cancelOrder/:id', patientController.cancelOrder);


router.get('/viewCartItems/:id' , patientController.viewCartItems)
router.delete('/removeCartItems/:id' , patientController.removeCartItems)
router.post('/checkout/:id' , patientController.checkout)
router.get('/addressesByPatientId/:id' , patientController.addressesByPatientId)
router.get('/getMeds',patientController.getMeds);
router.get('/getMedicinesByUse',patientController.getMedicinesByUse);
router.get('/getAllMedicineUses',patientController.getAllMedicineUses);
router.post('/payFromWallet/:patientId', patientController.payFromWallet);
router.post('/createWallet', patientController.createWallet);

router.get('/getPatient/:id', patientController.getPatient);


module.exports = router