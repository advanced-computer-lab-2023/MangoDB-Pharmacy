const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

router.get('/' , patientController.viewMed)
router.get('/:name' , patientController.searchMedicineByName)
module.exports = router