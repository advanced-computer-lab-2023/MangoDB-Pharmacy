const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/' , (req,res) => {
    res.status(200).json({message: 'Weselt'})
})


router.post('/addAdmin' , adminController.add_admin)
router.post('/addPharma', adminController.add_pharmacist);

module.exports = router;