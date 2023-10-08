const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/addAdmin' , adminController.add_admin)
router.post('/addPharma', adminController.add_pharmacist);

module.exports = router;