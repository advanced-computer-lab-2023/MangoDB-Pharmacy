const express = require("express");
const guestController = require("../controllers/guestController");
const router = express.Router();
const upload = require("../middleware/upload");

const { protect } = require("../middleware/authMiddleware");

//router.get("/", guestController.patientForm);

router.get("/regPatient", guestController.regPatientView);
router.post("/regPatient", guestController.registerAsPatient);

router.get("/regPharma", guestController.regPharmaView);
router.post(
  "/regPharma",
  upload.array("documents"),
  guestController.registerAsPharmacist
);
router.post("/regPharma", guestController.registerAsPharmacist);
router.post("/login", guestController.login);

module.exports = router;
