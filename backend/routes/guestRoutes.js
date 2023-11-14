const express = require("express");
const guestController = require("../controllers/guestController");
const router = express.Router();
const upload = require("../middleware/upload");

const { protect } = require("../middleware/authMiddleware");

//router.get("/", guestController.patientForm);

router.get("/regPatient", guestController.regPatientView);
router.post("/regPatient", guestController.regPatient);

router.get("/regPharma", guestController.regPharmaView);
router.post("/regPharma", upload.array("documents"), guestController.regPharma);

module.exports = router;
