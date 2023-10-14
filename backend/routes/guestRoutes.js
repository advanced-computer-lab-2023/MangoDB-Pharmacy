const express = require("express");
const guestController = require("../controllers/guestController");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

//router.get("/", guestController.patientForm);

router.get("/regPatient", guestController.regPatientView);
router.post("/regPatient", guestController.regPatient);
router.post("/regPharma", guestController.regPharma);

module.exports = router;
