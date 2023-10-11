const express = require('express');
const adminController = require('../controllers/adminController');
const pharmacistModel = require('../models/pharmacistModel');

const router = express.Router();

router.get('/' , (req,res) => {
    const pharmacists = pharmacistModel.find()
                                       .then((result) => {
                                            res.render('adminHome', { result });
                                       })
                                       .catch((err) => console.log(err));
    // res.render('adminHome')
})

router.get('/query?:name',adminController.searchFilter)
router.get('/getMed' , adminController.viewMed)
router.get('/viewPharmacistInfo/:id' , adminController.viewPharmacistInfo)
router.get('/viewAllPharmacists' , adminController.viewAllPharmacists)
router.get('/getPatientsBasicInfo' , adminController.getPatientsBasicInfo)
router.post('/addAdmin' , adminController.add_admin)
router.post('/addPharma', adminController.add_pharmacist);
router.delete('/deletePharma', adminController.deletePharmacist);
router.delete('/deletePatient', adminController.deletePatient);
router.get('/getPendingPharma', adminController.getPendingPharma);
//router.get('/:name' , adminController.searchMedicineByName)

module.exports = router;