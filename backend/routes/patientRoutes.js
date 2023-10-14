const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patientController');

const {protect} = require('../middleware/authMiddleware')

router.get("/", (req, res) => {
    res.render("../views/patientHome");
  });

router.get('/viewMed', patientController.viewMed)
router.get('/query' , patientController.searchFilter)
module.exports = router