const Admin = require("../models/adminModel");
const Pharmacist = require("../models/pharmacistModel");
const Patient = require("../models/patientModel");
const Medicine = require("../models/medicineModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const asyncHandler = require("express-async-handler");
const JWT_SECRET = 'abc123';
const add_admin = (req, res) => {
	// create a new Admin instance
	const admin = new Admin(req.body);

	const randomUsername = generateRandomUsername();
	const randomPassword = generateRandomPassword();
	console.log("Username:", randomUsername);
	console.log("Password:", randomPassword);
	admin.username = randomUsername;
	admin.password = randomPassword;

	admin
		.save()
		.then((result) => console.log("NEW ADMIN ADDED:", result))
		.catch((err) => console.log(err));

	console.log(admin.username, admin.password);
	res.status(201).json({
		email: admin.email,
		firstName: admin.firstName,
		lastName: admin.lastName,
		username: admin.username,
		password: admin.password,
	});
};
function generateRandomString(length) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}

	return result;
}
function generateRandomUsername() {
	const usernameLength = 8;
	return generateRandomString(usernameLength);
}

function generateRandomPassword() {
	const passwordLength = 12;
	return generateRandomString(passwordLength);
}
const add_pharmacist = (req, res) => {
	const pharmacist = Pharmacist.findOneAndUpdate("", { status: "hired" })
		.then((result) => {
			res
				.status(201)
				.json({ message: "pharmacist info reached line 26 successfully" });
		})
		.catch((err) => console.log(err));
	// Create a new Pharmacist instance
	// const pharmacist = new Pharmacist(req.body);
	// console.log(pharmacist.username,  pharmacist.password)
	// save the pharmacist to the database
	//
};

// @desc Get my (admin) info
// @route GET /admin/my-info
// @access Public
const getMyInfo = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.user.id);

	if (!admin) {
		res.status(400);
		throw new Error("Admin Does Not Exist");
	}

	res.status(200).json({
		_id: admin.id,
		name: admin.firstName + " " + admin.lastName,
		username: admin.username,
		email: admin.email,
	});
});

const deletePharmacist = asyncHandler(async (req, res) => {
	const id = req.params.id;
	Pharmacist.findByIdAndDelete(id)
		.then((result) => res.json({ redirect: "/Admin/viewAllPharmacists" }))
		.catch((err) => console.log(err));

	// try {
	//     const { username } = req.body; // Remove .text since it's not a nested object

	//     if (!username) {
	//       return res.status(400).json({ error: 'Username is required in the request body' });
	//     }

	//     const deletedPharmacist = await Pharmacist.findOneAndDelete({ username });

	//     if (!deletedPharmacist) {
	//       return res.status(404).json({ error: 'Pharmacist not found' });
	//     }

	//     return res.json({ message: 'Pharmacist deleted successfully' });
	//   } catch (error) {
	//     console.error(error);
	//     return res.status(500).json({ error: 'An error occurred while deleting the pharmacist' });
	//   }
});

// @desc Approve pharmacist registration
// @route PUT /admin/pharmacist-approval/:id
// @access Private
const pharmacistApproval = asyncHandler(async (req, res) => {
	try {
	  const pharmacist = await Pharmacist.findById(req.params.id);
  
	  if (!pharmacist) {
		res.status(400);
		throw new Error("Pharmacist not found");
	  }
  
	  if (pharmacist.accountStatus === "inactive") {
		pharmacist.accountStatus = "active";
		pharmacist.status = "hired"
		await pharmacist.save();
  
		const transporter = nodemailer.createTransport({
		  service: "Gmail",
		  auth: {
			user: "omarelzaher93@gmail.com",
			pass: "vtzilhuubkdtphww",
		  },
		});
  
		const mailOptions = {
		  from: "omarelzaher93@gmail.com",
		  to: pharmacist.email,
		  subject:
			"[NO REPLY] Congratulations! You Have Been Approved To Use El7any!",
		  html: `<h1> Congratulations Dr. ${pharmacist.lastName}<h1>
				  <p>Everything looks good on your part and we have decided to accept you to use our service! <p>
				  <p>You can now login with your username and password as you like. <p>
				  <p>We wish you a fruitful experience using El7any!<p>
				  <p>This Is An Automated Message, Please Do Not Reply.<p>`,
		};
  
		transporter.sendMail(mailOptions, (error, info) => {
		  if (error) {
			res.status(500);
			throw new Error("Something Went Wrong");
		  } else {
			res.status(200).json({
			  message: "Pharmacist Has Been Approved And Email Has Been Sent!",
			});
		  }
		});
	  } else {
		res.status(400).json({ message: "Pharmacist Is Already Active!" });
	  }
	} catch (error) {
	  res.status(500);
	  throw new Error("Pharmacist Approval Failed");
	}
  });
  
  // @desc Reject Pharmacist registration
  // @route GET /admin/pharmacist-rejection/:id
  // @access Private
  const pharmacistRejection = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log (id);
	try {
	  const pharmacist = await Pharmacist.findById(req.params.id);
  
	  if (!pharmacist) {
		  res.status(400);
		  throw new Error("Pharmacist not found");
		}
		
	  const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
		  user: "omarelzaher93@gmail.com",
		  pass: "vtzilhuubkdtphww",
		},
	  });
  
	  const mailOptions = {
		from: "omarelzaher93@gmail.com",
		to: pharmacist.email,
		subject: "[NO REPLY] Update On Your El7any Request To Join",
		html: `<h1> Dear Dr. ${pharmacist.lastName}<h1>
				  <p>We regret to inform you that after extensive research, we have come to the conclusion of rejecting your pharmacist request<p>
				  <p>We hope this rejection will not alter your perception of our service.<p>
				  <p>This Is An Automated Message, Please Do Not Reply.<p>`,
	  };
  
	  transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
		  res.status(500);
		  throw new Error("Something Went Wrong");
		}
	  });
  
	  await Pharmacist.findByIdAndDelete(req.params.id);
  
	  res.status(200).json({
		message: "Pharmacist Has Been Rejected, Deleted, and Informed via Email",
	  });
	} catch (error) {
	  res.status(500);
	  throw new Error("Pharmacist Rejection Failed");
	}
  });
  
const deletePatient = asyncHandler(async (req, res) => {
	const id = req.params.id;
	Patient.findByIdAndDelete(id)
		.then((result) => res.status(200).json({ message: "Patient removed succesfully", }))
		.catch((err) => console.log(err));

	// try {
	//     const { username } = req.body; // Remove .text since it's not a nested object

	//     if (!username) {
	//       return res.status(400).json({ error: 'Username is required in the request body' });
	//     }

	//     const deletedPatient = await Patient.findOneAndDelete({ username });

	//     if (!deletedPatient) {
	//       return res.status(404).json({ error: 'Patient not found' });
	//     }

	//     return res.json({ message: 'Patient deleted successfully' });
	//   } catch (error) {
	//     console.error(error);
	//     return res.status(500).json({ error: 'An error occurred while deleting the Patient' });
	//   }
});
const getPendingPharma = asyncHandler(async (req, res) => {
	try {
		const pendingPharmacists = await Pharmacist.find({ status: "pending" });

		if (pendingPharmacists.length === 0) {
			return res
				.status(404)
				.json({ error: "No pharmacists with pending status found" });
		}
		console.log(pendingPharmacists);

		return res.json(pendingPharmacists);
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ error: "An error occurred while retrieving pharmacists" });
	}
});

//search medicine based on name
const searchMedicineByName = asyncHandler(async (req, res) => {
	const medName = req.params.name; // Assuming you pass the name in the URL parameter

	try {
		const medicines = await Medicine.find({
			name: { $regex: new RegExp(medName, "i") }, // 'i' for case-insensitive search

			//idk la2etha keda :)
			//The $regex operator is used to perform a regular expression search on the name field.
			// The 'i' option in the regex makes the search case-insensitive.
		});

		if (medicines.length === 0) {
			res.status(404).json({ message: "medicine not found" });
			return;
		}

		res.status(200).json(medicines);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

const viewMed = asyncHandler(async (req, res) => {
	try {
		const medicines = await Medicine.find();

		// Extract the name and mobile and bla bla  from each patient document
		// const medInfo = medicines.map(medicine => ({
		//     id: medicine.__id,
		//     picture: medicine.picture,
		//     price: medicine.price,
		//     description: medicine.description,
		// }));

		// res.status(200).json(medInfo);
		res
			.status(200)
			.render("Admin/viewMeds", { meds: medicines, title: "Admin | Meds" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

//view a list of all available medicine
// const viewMed= asyncHandler( async (req,res) =>{
//   try {
//     const medicine= await Medicine.find()

//     // Extract the name and mobile and bla bla  from each patient document
//     const medInfo = medicine.map(medicine => ({
//         picture: medicine.picture,
//         price: medicine.price,
//         description: medicine.description,
//     }));

//     res.status(200).render('Admin/viewMeds', { meds: medicine, title: "Admin | Meds" });

//     // res.status(200).json(medInfo);
// } catch (error) {
//     res.status(500).json({ message: 'Server error' });
// }

//   //res.status(200).json(medicine)
// })

//find by id
//view pharmacist info
const viewPharmacistInfo = asyncHandler(async (req, res) => {
  try {
    const pharmacistId = req.params.id;
    const pharmacist = await Pharmacist.findById(pharmacistId);
    if (!pharmacist) {
      return res.status(404).json({ message: "Pharmacist not found" });
    }
    res.status(200).render("Admin/viewPharmacistInfo", {
      pharmacist,
      title: "Admin| Pharmacists",
    });
    // res.status(200).json(pharmacist)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  // const pharmacist= await Pharmacist.find()
  // res.status(200).json(pharmacist)
});
//view all 3shan el frontend
const viewAllPharmacists = asyncHandler(async (req, res) => {
  const pharmacist = await Pharmacist.find();
  res.status(200).render("Admin/viewAllPharmacists", {
    pharmacist,
    title: "Admin| Pharmacists",
  });
  // res.status(200).json(pharmacist)
});

const viewAllPatients = (req, res) => {
	Patient.find()
		.then((result) =>
			res.status(201).render("Admin/viewAllPatients", { patients: result })
		)
		.catch((err) => console.log(err));
};

//get patient basic info
//ntla3 kolo w n5tar
//hyd5al el id
const getPatientsBasicInfo = asyncHandler(async (req, res) => {
	// try {
	//   const { patientId } = req.params;
	//   const patient = await Patient.findById(patientId);

	//   // Check if the patient exists
	//   if (!patient) {
	//     return res.status(404).json({ message: 'Patient not found' });
	//   }
	//   const patientInfo = {
	//     name: patient.name,
	//     username: patient.username,
	//     mobile: patient.mobile,
	//     dob: patient.dob,
	//     gender: patient.gender,
	//   };

	//   res.status(200).json(patientInfo);
	// } catch (error) {
	//   res.status(500).json({ error: err.message });
	// }
	const id = req.params.id;
	Patient.findById(id)
		.then((result) =>
			res.status(201).render("Admin/getPatientsBasicInfo", { patient: result })
		)
		.catch((err) => console.log(err));

	//   try {
	//     const patients = await Patient.find();

	//     // Extract the name and mobile and bla bla  from each patient document
	//     const patientsInfo = patients.map(patient => ({
	//         id: patient._id,
	//         firstName: patient.firstName,
	//         lastName: patient.lastName,
	//         username: patient.username,
	//         mobile: patient.mobile,
	//         dob: patient.dob,
	//         gender: patient.gender,
	//     }));
	//     res.status(200).render('Admin/getPatientsBasicInfo', { patients, title: "Admin| patients" });
	//     // res.status(200).json(patientsInfo);
	// } catch (error) {
	//     res.status(500).json({ message: 'Server error' });
	// }
});

const searchFilter = asyncHandler(async (req, res) => {
	try {
		const { search, use } = req.query;
		const query = {};
		if (search) {
			query.name = { $regex: search, $options: "i" }; // Case-insensitive search
		}
		//And OR
		if (use) {
			// query.use = use;
			query.use = { $regex: use, $options: "i" };
		}

		// Fetch medicines based on the query
		const medicines = await Medicine.find(query);

		// Return the filtered medicines
		res.render("Admin/search", { medicines });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

// @desc Login admin
// @route POST /admin/login
// @access Public
const loginAdmin = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
  
	if (!username) {
	  res.status(400);
	  throw new Error("Please Enter Your Username");
	} else if (!password) {
	  res.status(400);
	  throw new Error("Enter Your Password");
	}
  
	// Check for username
	const admin = await Admin.findOne({ username });
  
	if (admin && (await bcrypt.compare(password, admin.password))) {
	  const initials = (admin.firstName ? admin.firstName[0] : '') +
					   (admin.lastName ? admin.lastName[0] : '');
  
	  res.status(200).json({
		message: "Successful Login",
		_id: admin.id,
		username: admin.username,
		name: admin.firstName,
		lastName: admin.lastName,
		email: admin.email,
		initials: initials, 
		token: generateToken(admin._id),
	  });
	} else {
	  res.status(400);
	  throw new Error("Invalid Credentials");
	}
  });
  
// @desc Approve pharmacist registration
// @route PUT /admin/pharmacist-approval/:id
// @access Private

// @desc Request otp
// @route GET /admin/request-otp
// @access Private
const sendOTP = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({email: req.body.email});

  const otp = generateOTP();
  admin.passwordResetOTP = otp;
  await admin.save();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "omarelzaher93@gmail.com",
      pass: "vtzilhuubkdtphww",
    },
  });

  const mailOptions = {
    from: "omarelzaher93@gmail.com",
    to: admin.email,
    subject: "[NO REPLY] Your Password Reset Request",
    html: `<h1>You have requested to reset your password.<h1>
                <p>Your OTP is ${otp}<p>
                <p>If you did not request to reset your password, you can safely disregard this message.<p>
                <p>We wish you a fruitful experience using El7a2ny!<p>
                <p>This Is An Automated Message, Please Do Not Reply.<p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500);
      throw new Error("Failed to Send OTP Email.");
    } else {
      res.status(200).json({ message: "OTP Sent, Please Check Your Email" });
    }
  });
});

// @desc Delete packages
// @route POST /admin/verify-otp
// @access Private
const verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const admin = await Admin.findOne({email: req.body.email});

  if (otp === admin.passwordResetOTP) {
    res.status(200).json({ message: "Correct OTP" });
  } else {
    res.status(400);
    throw new Error("Invalid OTP Entered");
  }
});

// @desc Delete packages
// @route POST /admin/reset-password
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const newPassword = req.body.password;
    const admin = await Admin.findOne({ email: req.body.email });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    if (await bcrypt.compare(newPassword, admin.password)) {
      res
        .status(400)
        .json({ message: "New Password Cannot Be The Same As the Old One" });
    } else {
      admin.password = hashedPassword;
      await admin.save();
      res
        .status(200)
        .json({ message: "Your Password Has Been Reset Successfuly" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
});


const changePassword = asyncHandler(async (req, res) => {
    try {
        const admin = req.user;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

		console.log(oldPassword);
		
        const salt = await bcrypt.genSalt(10);

        if (!(await bcrypt.compare(oldPassword, admin.password))) {
            res.status(400).json({ message: "Invalid Password" });
        }

        if (newPassword !== confirmPassword) {
            res.status(400).json({ message: "Passwords Do Not Match" });
        } else {
            if (await bcrypt.compare(newPassword, admin.password)) {
                res.status(400).json({
                    message: "New Password Cannot Be The Same As Old Password",
                });
            } else {
                admin.password = await bcrypt.hash(newPassword, salt);
                await admin.save();
                res.status(200).json({
                    message: "Password Changed Successfuly",
                });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});


module.exports = {
	add_admin,
	add_pharmacist,
	deletePharmacist,
	deletePatient,
	getPendingPharma,
	getPatientsBasicInfo,
	viewPharmacistInfo,
	viewMed,
	searchFilter,
	viewAllPharmacists,
	viewAllPatients,
	loginAdmin,
	sendOTP,
	verifyOTP,
	resetPassword,
	pharmacistApproval,
	pharmacistRejection,
	getMyInfo,
	changePassword
};