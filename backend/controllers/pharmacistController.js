const Pharmacist = require("../models/pharmacistModel");
const Medicine = require("../models/medicineModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const asyncHandler = require("express-async-handler");

// Old addMed function
// const addMedicine = (req, res) => {
//   // Check if req.file is defined before using it

//     const medicine = new Medicine({
//       name: req.body.name,
//       price: req.body.price,
//       use: req.body.use,
//       description: req.body.description,
//       quantity: req.body.quantity,
//       sales: req.body.sales,
//       details: req.body.details,
//     prescribed : req.body.prescribed})
//     if (req.file) {
//       console.log("error here");

//    medicine.picture = req.file.path
//       }

//    else {
//     console.log("No file was uploaded");
//   }
//   medicine
//       .save()
//       .then((result) => console.log("NEW MEDICINE ADDED:", result))
//       .catch((err) => console.log("Please change me I am just an error", err));
// };

const addMedicine = (req, res) => {
	try {
		const {
			name,
			price,
			use,
			description,
			quantity,
			sales,
			details,
			prescribed,
		} = req.body;

		// Check if req.file is defined before using it
		const medicine = new Medicine({
			name,
			price,
			use,
			description,
			quantity,
			sales,
			details,
			prescribed,
		});

		if (req.file) {
			// If a file is uploaded, set the picture path
			medicine.picture = req.file.path;
		}

		medicine
			.save()
			.then((result) => {
				console.log("NEW MEDICINE ADDED:", result);
				res.status(201).json({
					message: "Medicine added successfully",
					medicine: result,
				});
			})
			.catch((err) => {
				console.log("Error saving medicine:", err);
				res.status(500).json({
					error: "Internal server error",
				});
			});
	} catch (error) {
		console.error("Error adding medicine:", error);
		res.status(500).json({
			error: "Internal server error",
		});
	}
};

module.exports = {
	addMedicine,
};

const getDetails = (req, res) => {
	const medID = req.params.id;
	const med = Medicine.findById(medID)
		.then((result) => {
			res.status(200).render("Pharmacist/medDetails", { medicine: result });
		})
		.catch((err) => console.log(err));
};
//view a list of all available medicine
// const viewMed= asyncHandler( async (req,res) =>{
//   try {
//     const medicine= await Medicine.find()
//     const medInfo = medicine.map(medicine => ({
//         medicine
//     }));

//     //res.status(200).render('../views/Pharmacist/viewMeds', { meds: medicine, title: "Pharmacist | Meds" });
//      res.status(200).json(medInfo);
// } catch (error) {
//     res.status(500).json({ message: 'Server error' });
// }

//   //res.status(200).json(medicine)
// })
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
		res.status(200).render("Pharmacist/viewMeds", {
			meds: medicines,
			title: "Pharmacist | Meds",
		});
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

const getMedicine = asyncHandler(async (req, res) => {
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
		res.status(200).render("Pharmacist/getMedicine", {
			meds: medicines,
			title: "Pharmacist | Meds",
		});
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

// const editMedPrice =asyncHandler( async (req,res) =>{
//     const med = await Medicine.findById(req.params.id)
//     if(!med)
//     {
//         res.status(400)
//         throw new Error('not found ')
//     }

//     //const newPrice= req.body.price
//     //med.price=newPrice
//     //
//     const updatedMed = await Medicine.findByIdAndUpdate(req.params.id, req.body.price, {new: true})
//     res.status(200).json(updatedMed)
// })

//edit medicine price
const editMedPrice2 = asyncHandler(async (req, res) => {
	try {
		const { id, details, price } = req.body;
		const update = {};
		if (details) {
			update.details = details;
		}

		if (price) {
			update.price = price;
		}

		const updatedMed = await Medicine.findByIdAndUpdate(
			id,
			// { price: req.body.price }, // Update the price field with the new value
			update,
			{ new: true } //The { new: true } option is used to specify that you want the method to return the updated document after the update is applied. When you set { new: true }, the findByIdAndUpdate method will return the modified document with the new price value.
		);

		if (!updatedMed) {
			res.status(404).json({ message: "Medicine not found" });
			return;
		}

		res.status(200).json(updatedMed);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

const editMedPrice = async (req, res) => {
	const { id } = req.params;
	const { price, details } = req.body;
	console.log(id, price, details);

	try {
		if (!price && !details) {
			return res
				.status(400)
				.json({ error: "Price or details parameter is required for editing" });
		}

		// Find the medicine by ID
		const medicine = await Medicine.findById(id);

		if (!medicine) {
			return res.status(404).json({ error: "Medicine not found" });
		}

		// Update the medicine based on the provided fields
		if (price !== undefined) {
			medicine.price = price;
		}

		if (details !== undefined) {
			medicine.details = details;
		}

		// Save the updated medicine
		await medicine.save();

		res
			.status(200)
			.json({ message: "Medicine updated successfully", medicine });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// const editMedDetails =asyncHandler( async (req,res) =>{
//     const med = await Medicine.findById(req.params.id)
//     if(!med)
//     {
//         res.status(400)
//         throw new Error('not found ')
//     }
//     // const updatedMed = await Medicine.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     const newDetails= req.body.details;
//     med.details = newdetails;
//     const updatedMed = await med.save();
//     res.status(200).json(updatedMed)
// })

//edit medicine details
// const editMedDetails = asyncHandler(async (req, res) => {
//     try {
//         const updatedMed = await Medicine.findByIdAndUpdate(
//             req.params.id,
//             { details: req.body.details }, // Update the price field with the new value
//             { new: true } //The { new: true } option is used to specify that you want the method to return the updated document after the update is applied. When you set { new: true }, the findByIdAndUpdate method will return the modified document with the new price value.
//         );

//         if (!updatedMed) {
//             res.status(404).json({ message: 'Medicine not found' });
//             return;
//         }

//         res.status(200).json(updatedMed);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

//search medicine based on name
// const searchMedicineByName = asyncHandler(async (req, res) => {
//     const medName = req.params.name; // Assuming you pass the name in the URL parameter

//     try {
//         const medicines = await Medicine.find({
//             name: { $regex: new RegExp(medName, 'i') } // 'i' for case-insensitive search

//             //idk la2etha keda :)
//             //The $regex operator is used to perform a regular expression search on the name field.
//             // The 'i' option in the regex makes the search case-insensitive.

//         });

//         if (medicines.length === 0) {
//             res.status(404).json({ message: 'medicine not found' });
//             return;
//         }

//         res.status(200).json(medicines);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
//   });

// search & filter
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
		res.render("Pharmacist/search", { medicines });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// @desc Login pharmacist
// @route POST /pharmacist/login
// @access Public
const loginPharmacist = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	if (!username) {
		res.status(400);
		throw new Error("Please Enter Your Username");
	} else if (!password) {
		res.status(400);
		throw new Error("Enter Your Password");
	}

	// Check for username
	const pharmacist = await Pharmacist.findOne({ username });

	if (pharmacist && (await bcrypt.compare(password, pharmacist.password))) {
		res.status(200).json({
			message: "Successful Login",
			_id: pharmacist.id,
			username: pharmacist.username,
			name: pharmacist.firstName + pharmacist.lastName,
			email: pharmacist.email,
			token: generateToken(pharmacist._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Credentials");
	}
});

// @desc Request otp
// @route GET /pharmacist/request-otp
// @access Private
const sendOTP = asyncHandler(async (req, res) => {
	const pharmacist = await Pharmacist.findOne({ email: req.body.email });

	const otp = generateOTP();
	pharmacist.passwordResetOTP = otp;
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

// @desc Verify sent otp
// @route POST /pharmacist/verify-otp
// @access Private
const verifyOTP = asyncHandler(async (req, res) => {
	const { otp } = req.body;
	const pharmacist = await Pharmacist.findOne({ email: req.body.email });

	if (otp === pharmacist.passwordResetOTP) {
		res.status(200).json({ message: "Correct OTP" });
	} else {
		res.status(400);
		throw new Error("Invalid OTP Entered");
	}
});

// @desc reset password
// @route POST /pharmacist/reset-password
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
	try {
		const newPassword = req.body.password;
		const pharmacist = await Pharmacist.findOne({ email: req.body.email });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		if (await bcrypt.compare(newPassword, pharmacist.password)) {
			res
				.status(400)
				.json({ message: "New Password Cannot Be The Same As the Old One" });
		} else {
			pharmacist.password = hashedPassword;
			await pharmacist.save();
			res
				.status(200)
				.json({ message: "Your Password Has Been Reset Successfuly" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error resetting password" });
	}
});

function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

const viewPharmacists = asyncHandler(async (req, res) => {
	try {
		const pharmacists = await Pharmacist.find();
		res.status(200).json(pharmacists);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

const getPharmacist = asyncHandler(async (req, res) => {
	try {
		const id = req.user._id;
		const pharmacist = await Pharmacist.findById(id);

		res.status(200).json(pharmacist);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

const getPharmacistByEmail = asyncHandler(async (req, res) => {
	try {
		const pharmacist = await Pharmacist.findOne({ email: req.body.email });

		if (pharmacist) {
			res.status(200).json(pharmacist);
		} else {
			res.status(400).json({ message: "Pharmacist not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

const getSalesByMonth = asyncHandler(async (req, res) => {
	try {
	  const { month } = req.body; // Assuming the month is passed in the request body
  
	  if (!month) {
		res.status(400).json({ error: "Month parameter is required" });
		return;
	  }
  
	  // Convert the month to a format that MongoDB can query
	  const startDate = new Date(`${month}-01T00:00:00.000Z`);
	  const endDate = new Date(
		new Date(startDate).setMonth(startDate.getMonth() + 1)
	  );
  
	  const sales = await Order.find({
		status: "delivered", // Assuming sales are only considered if the status is "delivered"
		dateOfDelivery: {
		  $gte: startDate,
		  $lt: endDate,
		},
	  });
  
	  // Extract relevant information for the table
	  const formattedSales = sales.map((order) => ({
		orderId: order._id,
		dateOfDelivery: order.dateOfDelivery,
		totalPrice: order.totalPrice,
		orderDetails: order.orderdetails.map((item) => ({
		  medicineName: item.medicineName,
		  quantity: item.quantity,
		})),
	  }));
  
	  res.status(200).json({
		message: `Sales for ${month}`,
		sales: formattedSales,
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: "Internal server error" });
	}
  });
  
  
  


const changePassword = asyncHandler(async (req, res) => {
    try {
        const pharmacist = req.user;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        const salt = await bcrypt.genSalt(10);

        if (!(await bcrypt.compare(oldPassword, pharmacist.password))) {
            res.status(400).json({ message: "Invalid Password" });
        }

        if (newPassword !== confirmPassword) {
            res.status(400).json({ message: "Passwords Do Not Match" });
        } else {
            if (await bcrypt.compare(newPassword, pharmacist.password)) {
                res.status(400).json({
                    message: "New Password Cannot Be The Same As Old Password",
                });
            } else {
                pharmacist.password = await bcrypt.hash(newPassword, salt);
                await pharmacist.save();
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
	addMedicine,
	getMedicine,
	editMedPrice,
	viewMed,
	searchFilter,
	getDetails,
	loginPharmacist,
	sendOTP,
	verifyOTP,
	getSalesByMonth,
	resetPassword,
	viewPharmacists,
	getPharmacist,
	getPharmacistByEmail,
	changePassword

};
