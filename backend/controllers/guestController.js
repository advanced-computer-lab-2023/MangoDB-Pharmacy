const Medicine = require("../models/guestModel");
const Patient = require("../models/patientModel");
const Pharma = require("../models/pharmacistModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'abc123';
const registerUser = async (req, res, model, userType, fields) => {
  const data = req.body;
  // for (const field of fields) {
  // 	if (!data[field]) {
  // 		return res.status(400).json({ message: "Fill all fields" });
  // 	}
  // }
  console.log(data);

  try {
    const usernameExists = await User.findOne({ username: data.username });
    if (usernameExists)
      return res.status(400).json({ error: "Username already exists" });

    const emailExists = await User.findOne({ email: data.email });
    if (emailExists)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    console.log(hashedPassword);
    const user = await model.create({
      ...data,
      password: hashedPassword,
      userType: userType,
      accountStatus: userType === "patient" ? "active" : "inactive",
    });
    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: genToken(user._id),
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const registerAsPharmacist = asyncHandler(async (req, res) => {
  await registerUser(req, res, Pharma, "Pharmacist", [
    "address",
    "rate",
    "affiliation",
    "Education",
  ]);
  if (req.files) {
    for (const file of req.files) {
      const url = `http://localhost:4000/uploads/${file.originalname}`;
      const document = {
        name: file.originalname,
        file: url,
      };
      Pharma.documents.push(document);
    }
    //await user.save();
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
console.log(username);
  const user = await User.findOne({ username });
  console.log(user);
  if (!user) return res.status(404).json({ message: "User not found" });

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword)
    return res.status(400).json({ message: "Password is incorrect" });

  const token = genToken(user._id);

  res.status(200).json({
    _id: user.id,
    username: user.username,
    type: user.userType,
    token: token,
  });
});

const genToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

const maxAge = 3 * 24 * 60 * 60;

/////
const regPatientView = (req, res) => {
  res.status(200).render("patientRegistration");
};
const registerAsPatient = asyncHandler(async (req, res) => {
  await registerUser(req, res, Patient, "patient", [
    "mobile",
    "emergencyContactName",
    "addresses",
    "gender",
    "emergencyContactMobile",
  ]);
});

const regPharmaView = (req, res) => {
  res.status(200).render("pharmacistRegistration");
};

module.exports = {
  registerAsPatient,
  registerAsPharmacist,
  regPatientView,
  regPharmaView,
  login,
};
