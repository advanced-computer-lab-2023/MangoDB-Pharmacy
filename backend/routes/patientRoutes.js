const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patientController');

const {protect} = require('../middleware/authMiddleware')

router.get('/viewMed', patientController.viewMed)
router.get('/query?:name' , patientController.searchFilter)
module.exports = router