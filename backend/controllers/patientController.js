const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const Medicine = require("../models/medicineModel");
const Pharmacist = require("../models/pharmacistModel");
const Prescription = require("../models/prescriptionModel");

const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Wallet = require("../models/walletModel");
const JWT_SECRET = 'abc123';

const createWallet = async (req, res) => {
	try {
		const { user, balance } = req.body;
		const wallet = new Wallet({
			user,
			balance,
		});
		const savedwallet = await wallet.save();

		console.log(savedwallet);
		res.status(200).json(savedwallet);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
//view a list of all available medicine
const viewMed = asyncHandler(async (req, res) => {
	try {
		const medicines = await Medicine.find();
		medicines.forEach((medicine) => {});

		res.status(200).json(medicines);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

const getMed = asyncHandler(async (req, res) => {
	try {
		const id = req.params.id;
		const medicine = await Medicine.findById(id);

		res.status(200).json(medicine);
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
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
		res.render("Patient/search", { medicines });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

const addMedicineToCart = async (req, res) => {
    const { medicineName, quantity } = req.body;
    const patientId = req.user._id;
    console.log(patientId);
    try {
        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        const cartItem = patient.cart.find(
            (item) => item.medicineName === medicineName
        );
        const medicine = await Medicine.findOne({ name: medicineName });

        if (!medicine) {
            return res.status(404).json({ error: "Medicine not found" });
        }

         console.log(patientId, medicineName)

        if (medicine.prescribed === "required") {
            const prescription = await Prescription.findOne({
                patientId,
                'medications.medicationName': medicineName,
              });
              
              if (!prescription) {
                return res.status(400).json({
                  error: `This medicine requires a prescription, and the patient does not have a valid prescription.`,
                });
              }
          }

        console.log(medicine.prescribed);

        if (cartItem) {
            const totalQuantity = cartItem.quantity + quantity;

            if (totalQuantity > medicine.quantity) {
                return res.status(400).json({
                    error: `Quantity not available. Available quantity for ${medicineName}: ${
                        medicine.quantity - cartItem.quantity
                    }`,
                });
            }

            const totalPrice = totalQuantity * medicine.price;

            cartItem.quantity = totalQuantity;
            cartItem.price = totalPrice;
        } else {
            if (quantity > medicine.quantity) {
                return res.status(400).json({
                    error: `Quantity not available. Available quantity for ${medicineName}: ${medicine.quantity}`,
                });
            }

            const totalPrice = quantity * medicine.price;

            patient.cart.push({
                medicineName: medicine.name,
                quantity: quantity,
                price: totalPrice,
            });
        }

        await patient.save();

        return res.status(201).json({ message: "Medicine added to the cart" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const changeCartItemAmount = async (req, res) => {
	const { medicineName, quantity } = req.body;

	const patientId = req.user._id;

	try {
		const patient = await Patient.findById(patientId);

		if (!patient) {
			return res.status(404).json({ error: "Patient not found" });
		}

		const cartItem = patient.cart.find(
			(item) => item.medicineName === medicineName
		);

		if (!cartItem) {
			return res.status(404).json({ error: "Medicine not found in the cart" });
		}

		const medicine = await Medicine.findOne({ name: medicineName });

		if (!medicine) {
			return res.status(404).json({ error: "Medicine not found" });
		}

		if (quantity > medicine.quantity) {
			return res.status(400).json({
				error: `Quantity not available. Available quantity for ${medicineName}: ${medicine.quantity}`,
			});
		}

		const totalPrice = quantity * medicine.price;

		cartItem.quantity = quantity;
		cartItem.price = totalPrice;

		await patient.save();

		return res
			.status(200)
			.json({ message: "Cart item quantity changed successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const addAddress = async (req, res) => {
	const { address } = req.body;
	const patientId = req.user._id;

	try {
		const patient = await Patient.findById(patientId);

		if (!patient) {
			return res.status(404).json({ error: "Patient not found" });
		}

		patient.addresses.push(address);

		await patient.save();

		return res.status(201).json({ message: "Address added successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const viewListOfOrders = async (req, res) => {
	// const {patientId} = req.body
	const patientId = req.user._id;
	// console.log(patientId)

	try {
		const orders = await Order.find({ patientId });
		// console.log(orders)

		if (orders.length === 0) {
			return res
				.status(404)
				.json({ message: "No orders found for the patient" });
		}

		res.status(200).json(orders);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const viewOrderDetails = async (req, res) => {
	const orderId = req.params.id;

	try {
		const order = await Order.findById(orderId);
		console.log(order);
		if (!order) {
			return res.status(404).json({ error: "Order not found" });
		}

		return res.status(200).json(order);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const cancelOrder = async (req, res) => {
	const orderId = req.params.id;

	try {
		const order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({ error: "Order not found" });
		}

		if (order.status !== "preparing") {
			return res.status(200).json({ error: "Order cannot be canceled" });
		}

		order.status = "cancelled";

		await order.save();

		return res.status(200).json({ message: "Order has been canceled" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const createPatient = async (req, res) => {
	try {
		const {
			gender,
			mobile,
			addresses,
			emergency,
			family,
			username,
			email,
			password,
			firstName,
			lastName,
			dob,
			userType,
			accountStatus,
		} = req.body;

		const newPatient = new Patient({
			gender,
			mobile,
			addresses,
			emergency,
			family,
			username,
			email,
			password,
			firstName,
			lastName,
			dob,
			userType,
			accountStatus,
		});

		const savedPatient = await newPatient.save();

		res.status(201).json(savedPatient);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getPatients = asyncHandler(async (req, res) => {
	try {
		const patients = await Patient.find();
		res.status(200).json(patients);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

const getPatient = asyncHandler(async (req, res) => {
	try {
		const patient = await Patient.findOne({ email: req.body.email });
		console.log(patient);

		if (!patient) {
			return res.status(404).json({ error: "No such patient found" });
		}

		return res.status(200).json(patient);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

const viewCartItems = async (req, res) => {
	const patientId = req.user._id;

	try {
		const patient = await Patient.findById(patientId);

		if (!patient) {
			return res.status(404).json({ error: "Patient not found" });
		}

		const cartItems = patient.cart;
		const medInfo = [];

		for (const cartItem of cartItems) {
			const medicine = await Medicine.findOne({ name: cartItem.medicineName });

			if (medicine) {
				const item = {
					id: medicine._id,
					name: medicine.name,
					picture: medicine.picture,
					price: cartItem.price,
					quantity: cartItem.quantity,
				};
				medInfo.push(item);
			} else {
				res.status(500).json({ error: "medicine not found" });
			}
		}
		res.status(200).json(medInfo);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const removeCartItems = async (req, res) => {
	console.log("Received request with patient ID:", req.user._id);
	const  medicinename  = req.body.medicinename;
	const patientId = req.user._id;
	try {
		const patient = await Patient.findById(patientId);

		if (!patient) {
			return res.status(404).json({ error: "Patient not found" });
		}
		const cart = patient.cart;
		const medicineIndex = cart.findIndex(
			(item) => item.medicineName === medicinename
		);
		if (medicineIndex === -1) {
			return res.status(404).json({ error: "Medicine not found in the cart" });
		}
		cart.splice(medicineIndex, 1);
		await patient.save();
		res.status(200).json({ message: "Medicine removed from the cart" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const checkout = async (req, res) => {
	const { deliveryAddress, paymentMethod } = req.body;
	const patientId = req.user._id;
	let totalPrice = 0;
	try {
		const patient = await Patient.findById(patientId);
		if (!patient) {
			return res.status(404).json({ error: "Patient not found" });
		}
		const finalorder = patient.cart;
		const orderdetails = [];
		for (const cartItem of finalorder) {
			const medicine = await Medicine.findOne({ name: cartItem.medicineName });
			//if(medicine.quantity>0){
			medicine.quantity = medicine.quantity - cartItem.quantity;
			totalPrice += cartItem.price;
			const item = {
				medicineName: medicine.name,
				picture: medicine.picture,
				quantity: cartItem.quantity,
			};
			orderdetails.push(item);
			await medicine.save();
			if(medicine.quantity==0)
			{
				//system
				const pharmacist= Pharmacist.find()
				if (!pharmacist.notifications) {
					pharmacist.notifications = [];
				}

				pharmacist.notifications.push({
					title: "Appointment Cancelled",
					body: `Kindly note that ${medicine} is out of stock `
				});
				await pharmacist.save();
				//email
				const transporter = nodemailer.createTransport({
					service: "Gmail",
					auth: {
						user: "omarelzaher93@gmail.com",
						pass: "vtzilhuubkdtphww",
					},
				});
			
				const mailOptions = {
					from: "omarelzaher93@gmail.com",
					to: `dina.mamdouh.131@gmail.com, ${pharmacist.email}`,//send it lel dr wel patient 
					subject: "[NO REPLY] Medicine out of stock ",
					text: `Kindly note that ${medicine} is out of stock `
				};
			
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						res.status(500);
						throw new Error(error.message);
					} else {
						res.status(200).json({ message: "OTP Sent, Please Check Your Email" });
					}
				});

			}
			//}
		}

		if (paymentMethod == "wallet") {
			const paymentResponse = await payFromWallet(patientId, totalPrice);

			if (!paymentResponse.success) {
				return res.status(400).json({ error: paymentResponse.message });
			}
		}
		const dateOfOrder = new Date();
		const dateOfDelivery = new Date(dateOfOrder);
		dateOfDelivery.setDate(dateOfOrder.getDate() + 2);
		const order = await Order.create({
			status: "preparing",
			dateOfOrder,
			dateOfDelivery,
			deliveryAddress,
			paymentMethod,
			totalPrice,
			patientId,
			orderdetails,
		});

		patient.cart = [];

		await patient.save();
		res.status(200).json(order);
	} catch (error) {
		console.error("Error creating order:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// @desc Login patient
// @route POST /patient/login
// @access Public
const loginPatient = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	if (!username) {
		res.status(400);
		throw new Error("Please Enter Your Username");
	} else if (!password) {
		res.status(400);
		throw new Error("Enter Your Password");
	}

	// Check for username
	const patient = await Patient.findOne({ username });

	console.log(patient);
	if (patient && (await bcrypt.compare(password, patient.password))) {
		res.status(200).json({
			message: "Successful Login",
			_id: patient.id,
			username: patient.username,
			name: patient.firstName + patient.lastName,
			email: patient.email,
			token: generateToken(patient._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Credentials");
	}
});

// @desc Request otp
// @route GET /patient/request-otp
// @access Private
const sendOTP = asyncHandler(async (req, res) => {
	const patient = await Patient.findOne({ email: req.body.email });

	const otp = generateOTP();
	patient.passwordResetOTP = otp;
	await patient.save();

	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "omarelzaher93@gmail.com",
			pass: "vtzilhuubkdtphww",
		},
	});

	const mailOptions = {
		from: "omarelzaher93@gmail.com",
		to: patient.email,
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
// @route POST /patient/verify-otp
// @access Private
const verifyOTP = asyncHandler(async (req, res) => {
	const { otp } = req.body;
	const patient = await Patient.findOne({ email: req.body.email });

	if (otp === patient.passwordResetOTP) {
		res.status(200).json({ message: "Correct OTP" });
	} else {
		res.status(400);
		throw new Error("Invalid OTP Entered");
	}
});

// @desc Reset Password
// @route POST /patient/reset-password
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
	try {
		const newPassword = req.body.password;
		const patient = await Patient.findOne({ email: req.body.email });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		if (await bcrypt.compare(newPassword, patient.password)) {
			res
				.status(400)
				.json({ message: "New Password Cannot Be The Same As the Old One" });
		} else {
			patient.password = hashedPassword;
			await patient.save();
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
	return jwt.sign({ id },JWT_SECRET, {
		expiresIn: "30d",
	});
};

const addressesByPatientId = async (req, res) => {
	const patientId = req.user._id;

	try {
		const patient = await Patient.findById(patientId);

		if (!patient) {
			return res.status(404).json({ error: "Patient not found" });
		}

		const addresses = patient.addresses;
		res.status(200).json({ addresses });
	} catch (error) {
		res.status(500).json({ error: "Error" });
	}
};

const getMeds = asyncHandler(async (req, res) => {
	try {
		const meds = await Medicine.find();
		res.status(200).json(meds);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

const getMedicinesByUse = async (req, res) => {
	const { use } = req.query;
	try {
		if (!use) {
			return res.status(400).json({ error: "Use parameter is required" });
		}

		const medicines = await Medicine.find({
			use: { $regex: use, $options: "i" },
		});

		if (!medicines || medicines.length === 0) {
			return res
				.status(404)
				.json({ error: "Medicines not found for the specified use" });
		}

		res.status(200).json({ medicines });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getAllMedicineUses = async (req, res) => {
	try {
		const uniqueUses = await Medicine.distinct("use");
		console.log(uniqueUses);
		res.status(200).json(uniqueUses);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const payFromWallet = async (paymentAmount) => {
	try {
		const patientId = req.user._id;
		if (!patientId || !paymentAmount) {
			return {
				success: false,
				message: "Patient ID and payment amount are required",
			};
		}

		const patient = await Patient.findById(patientId);
		if (!patient) {
			return { success: false, message: "Patient not found" };
		}

		const packageType = patient.healthPackage
			? patient.healthPackage.name
			: null;
		let medicineDiscount = 0;

		if (packageType) {
			switch (packageType) {
				case "Silver":
					medicineDiscount = 0.2;
					break;
				case "Gold":
					medicineDiscount = 0.3;
					break;
				case "Platinum":
					medicineDiscount = 0.4;
					break;
				default:
					// Handle the case where an invalid package type is provided
					// console.error('Invalid package type');
					// return res.status(400).json({ error: 'Invalid package type' });
					medicineDiscount = 0;
			}
		}

		paymentAmount -= medicineDiscount;
		const wallet = await Wallet.findOne({ user: patientId });

		if (!wallet) {
			return { success: false, message: "Wallet not found" };
		}

		if (wallet.balance < paymentAmount) {
			return { success: false, message: "Insufficient funds in the wallet" };
		}

		// Deduct the payment amount from the wallet balance
		wallet.balance -= paymentAmount;

		// Record the transaction in the wallet
		wallet.transactions.push({
			type: "debit",
			amount: paymentAmount,
			date: new Date(),
		});

		// Save the updated wallet
		await wallet.save();

		return { success: true, message: "Payment successful" };
	} catch (error) {
		return { success: false, message: error.message };
	}
};

const changePassword = asyncHandler(async (req, res) => {
    try {
        const patient = req.user;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const confirmPassword = req.body.confirmPassword;

        const salt = await bcrypt.genSalt(10);

        if (!(await bcrypt.compare(oldPassword, patient.password))) {
            res.status(400).json({ message: "Invalid Password" });
        }

        if (newPassword !== confirmPassword) {
            res.status(400).json({ message: "Passwords Do Not Match" });
        } else {
            if (await bcrypt.compare(newPassword, patient.password)) {
                res.status(400).json({
                    message: "New Password Cannot Be The Same As Old Password",
                });
            } else {
                patient.password = await bcrypt.hash(newPassword, salt);
                await patient.save();
                res.status(200).json({
                    message: "Password Changed Successfuly",
                });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

const createPrescription = async (req, res) => {
    try {
        const {
            patientId,
            // doctorId,
            medications,
            date,
            filled

        } = req.body;

        const newPrescription = new Prescription({
            patientId,
            // doctorId,
            medications,
            date,
            filled
        });

        const savedPrescription = await newPrescription.save();

        res.status(201).json(savedPrescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = {
	viewMed,
	searchFilter,
	addMedicineToCart,
	createPatient,
	getPatients,
	getPatient,
	changeCartItemAmount,
	addAddress,
	viewListOfOrders,
	viewOrderDetails,
	cancelOrder,
	checkout,
	viewCartItems,
	removeCartItems,
	loginPatient,
	sendOTP,
	resetPassword,
	verifyOTP,
	getMed,
	addressesByPatientId,
	getMeds,
	getMedicinesByUse,
	getAllMedicineUses,
	payFromWallet,
	createWallet,
	getPatient,
	changePassword,
	createPrescription

};
