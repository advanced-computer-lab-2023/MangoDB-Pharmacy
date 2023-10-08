const express = require('express');
const pharmacistController = require('../controllers/pharmacistController');
const router = express.Router();

router.get('/:id' , (req,res) => {
    res.status(200).json({message: 'Weselt'})
})
router.post('/' , pharmacistController.addMedicine)
router.post('/:id' , pharmacistController.editMedPrice)

    
module.exports = router;