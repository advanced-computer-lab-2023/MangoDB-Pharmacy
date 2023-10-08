const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/' , (req,res) => {
    res.status(200).json({message: 'Weselt'})
})


router.post('/addAdmin' , adminController.add_admin)
router.post('/addPharma', adminController.add_pharmacist);
router.delete('/deletePharma', adminController.deletePharmacist);
router.delete('/deletePatient', adminController.deletePatient);
router.get('/getPendingPharma', adminController.getPendingPharma);
module.exports = router;