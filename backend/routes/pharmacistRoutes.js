const express = require('express');
const pharmacistController = require('../controllers/pharmacistController');
const router = express.Router();

// router.get('/:id' , (req,res) => {
//     res.status(200).json({message: 'Weselt'})
// })
router.get('/', pharmacistController.home)
router.post('/addMedicine' , pharmacistController.addMedicine)
router.get('/getMedicine', pharmacistController.getMedicine)
router.get('/query?:name', pharmacistController.searchFilter)
router.post('/:id' , pharmacistController.editMedPrice)
// router.get('/:name' , pharmacistController.searchMedicineByName)


    
module.exports = router;