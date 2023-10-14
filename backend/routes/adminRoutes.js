const express = require('express');
const adminController = require('../controllers/adminController');
const pharmacistModel = require('../models/pharmacistModel');

const router = express.Router();

router.get('/' , (req,res) => {
    res.render('../views/adminHome')
})

router.get('/query',adminController.searchFilter)
router.get('/viewMed' , adminController.viewMed)
router.get('/viewPharmacistInfo/:id' , adminController.viewPharmacistInfo)
router.get('/viewAllPharmacists' , adminController.viewAllPharmacists)
router.get('/viewAllPatients' , adminController.viewAllPatients)
router.get('/getPatientsBasicInfo/:id' , adminController.getPatientsBasicInfo)
router.post('/addAdmin' , adminController.add_admin)
router.post('/addPharma', adminController.add_pharmacist);
router.delete('/deletePharma/:id', adminController.deletePharmacist);
router.delete('/deletePatient/:id', adminController.deletePatient);
router.get('/getPendingPharma', adminController.getPendingPharma);
router.get('/:id', adminController.viewPharmacistInfo);


// router.get('/', (req, res) => {
//     res.status(200).render('Admin/Home');
//   });
//router.get('/:name' , adminController.searchMedicineByName)

module.exports = router;