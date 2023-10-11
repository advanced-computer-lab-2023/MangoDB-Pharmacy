const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/' , (req,res) => {
    res.render('../backend/views/adminHome.ejs')
})

router.get('/getMed' , adminController.viewMed)
router.get('/viewPharma' , adminController.viewPharmacist)
router.get('/viewPatient' , adminController.getPatient)
router.post('/addAdmin' , adminController.add_admin)
router.post('/addPharma', adminController.add_pharmacist);
router.delete('/deletePharma', adminController.deletePharmacist);
router.delete('/deletePatient', adminController.deletePatient);
router.get('/getPendingPharma', adminController.getPendingPharma);
router.get('/:name' , adminController.searchMedicineByName)

module.exports = router;