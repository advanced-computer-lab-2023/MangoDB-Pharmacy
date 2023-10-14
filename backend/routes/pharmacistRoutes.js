const express = require("express");
const pharmacistController = require("../controllers/pharmacistController");
const router = express.Router();
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // specify the folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.get('/:id' , (req,res) => {
//     res.status(200).json({message: 'Weselt'})
// })
router.get("/", (req, res) => {
  res.render("../views/pharmaHome");
});
//upload.single('picture'),
router.post("/addMedicine", pharmacistController.addMedicine);
router.get("/addMedicine", (req, res) => {
  res.render("Pharmacist/addMedicine");
});

// router.get('/', pharmacistController.home)

router.get("/viewMed", pharmacistController.viewMed);
router.get("/getMed", pharmacistController.getMedicine);
//test
router.get("/medDetails/:id", pharmacistController.getDetails);
//test
router.get("/query", pharmacistController.searchFilter);
// router.put('/:id ', pharmacistController.editMedPrice)
router.put("/updateMed", pharmacistController.editMedPrice);
// router.get('/:name' , pharmacistController.searchMedicineByName)

module.exports = router;
