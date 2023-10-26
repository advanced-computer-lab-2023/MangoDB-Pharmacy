const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patientController');

const {protect} = require('../middleware/authMiddleware')

router.get("/", (req, res) => {
    res.render("../views/patientHome");
  });

router.get('/viewMed', patientController.viewMed)
router.get('/query' , patientController.searchFilter)
router.get('/request-otp' , patientController.sendOTP)
router.post('/addMedicineInCart/:id' , patientController.addMedicineToCart)
router.post('/createPatient', patientController.createPatient);
router.get('/getPatients',patientController.getPatients);
router.post('/changeCartItemAmount/:id' , patientController.changeCartItemAmount)
router.post('/addAddress/:id' , patientController.addAddress)
router.post('/login' , patientController.loginPatient)
router.post('/verify-otp' , patientController.verifyOTP)
router.post('/reset-password' , patientController.resetPassword)
router.get('/viewListOfOrders/:id', patientController.viewListOfOrders);
router.get('/viewOrderDetails/:id', patientController.viewOrderDetails);
router.post('/cancelOrder/:id', patientController.cancelOrder);


router.get('/carts' , patientController.viewCartItems)
router.delete('/removecart' , patientController.removeCartItems)
router.post('/checkout' , patientController.checkout)



module.exports = router