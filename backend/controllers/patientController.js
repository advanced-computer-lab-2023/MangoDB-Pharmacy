const asyncHandler = require('express-async-handler')
const Patient = require('../models/patientModel');
const Medicine = require('../models/medicineModel');
const Pharmacist = require('../models/pharmacistModel');
const Order = require('../models/orderModel'); 

//const asyncHandler = require('express-async-handler')

//view a list of all available medicine 
const viewMed= asyncHandler( async (req,res) =>{
    try {
      const medicines= await Medicine.find()
  
      // Extract the name and mobile and bla bla  from each patient document
      // const medInfo = medicines.map(medicine => ({
      //     id: medicine.__id,
      //     picture: medicine.picture,
      //     price: medicine.price,
      //     description: medicine.description,
      // }));
  
      // res.status(200).json(medInfo);
      res.status(200).render('Patient/viewMeds', { meds: medicines, title: "Patient | Meds" });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
  

    //res.status(200).json(medicine)
  })

  const searchFilter = asyncHandler (async (req, res) => {
    try {
      const { search, use } = req.query;
      const query = {};
      if (search) {
        query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
      }
        //And OR
      if (use) {
        // query.use = use;
        query.use = { $regex: use, $options: 'i' }
      }
  
      // Fetch medicines based on the query
      const medicines = await Medicine.find(query);
  
      // Return the filtered medicines
      res.render('Patient/search', { medicines });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
//search medicine based on name 
// const searchMedicineByName = asyncHandler(async (req, res) => {
//     const medName = req.params.name; // Assuming you pass the name in the URL parameter
  
//     try {
//         const medicines = await Medicine.find({
//             name: { $regex: new RegExp(medName, 'i') } // 'i' for case-insensitive search
  
  
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




const addMedicineToCart = async (req, res) => {
  const { medicineName, quantity } = req.body;
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const cartItem = patient.cart.find((item) => item.medicineName === medicineName);
    const medicine = await Medicine.findOne({ name: medicineName });

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    if (cartItem) {
      const totalQuantity = cartItem.quantity + quantity;

     
      if (totalQuantity > medicine.quantity) {
        return res.status(400).json({
          error: `Quantity not available. Available quantity for ${medicineName}: ${medicine.quantity - cartItem.quantity}`,
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

    return res.status(201).json({ message: 'Medicine added to the cart' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const changeCartItemAmount = async (req, res) => {
  const { medicineName, quantity } = req.body;
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const cartItem = patient.cart.find((item) => item.medicineName === medicineName);

    if (!cartItem) {
      return res.status(404).json({ error: 'Medicine not found in the cart' });
    }

    const medicine = await Medicine.findOne({ name: medicineName });

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
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

    return res.status(200).json({ message: 'Cart item quantity changed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



const addAddress = async (req, res) => {
  const { address } = req.body;
  const patientId = req.params.id;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    patient.addresses.push(address);

    await patient.save();

    return res.status(201).json({ message: 'Address added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const viewListOfOrders= async (req, res) => {
  const patientId = req.params.id;

  try {
    const orders = await Order.find({ patientId });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the patient' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const viewOrderDetails = async (req, res) => {
  const orderId = req.params.id; 

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const cancelOrder = async (req, res) => {
  const orderId = req.params.id; 

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Order cannot be canceled' });
    }

    order.status = 'cancelled';

    await order.save();

    return res.status(200).json({ message: 'Order has been canceled' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
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
      accountStatus
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
    res.status(500).json({ error: 'Internal server error' });
  }
});
const viewCartItems = async (req, res) => {
  const { patientId } = req.body;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const cartItems = patient.cart;
    const medInfo = [];

    for (const cartItem of cartItems) {
      const medicine = await Medicine.findOne({ name: cartItem.medicineName });

      if (medicine) {
        const item = {
          name: medicine.name,
          // picture: medicine.picture,
          price: cartItem.price,
          quantity: cartItem.quantity        };
        medInfo.push(item);
      }
      else {
        res.status(500).json({ error: 'medicine not found' });

      }
    }
    res.status(200).json(medInfo);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const removeCartItems = async (req, res) => {
  const { patientId, medicinename } = req.body;
  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const cart = patient.cart
    const medicineIndex = cart.findIndex(item => item.medicineName === medicinename);
    if (medicineIndex === -1) {
      return res.status(404).json({ error: 'Medicine not found in the cart' });
    }
    cart.splice(medicineIndex, 1);
    await patient.save();
    res.status(200).json({ message: 'Medicine removed from the cart' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const checkout = async (req, res) => {
  const {patientId,deliveryAddress,paymentMethod} = req.body;
let totalPrice = 0
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const finalorder = patient.cart
    const orderdetails = [];
    for (const cartItem of finalorder) {
       const medicine = await Medicine.findOne({ name: cartItem.medicineName });

       medicine.quantity = medicine.quantity - cartItem.quantity
       totalPrice+= cartItem.price 
          const item = {
            medicineName: medicine.name,
            // picture: medicine.picture,
            quantity: cartItem.quantity, 
            };
            orderdetails.push(item);
          await medicine.save();
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
    res.status(500).json({ error: 'Internal Server Error' });  }
};

// @desc Login patient
// @route POST /patient/login
// @access Public
const loginPatient = asyncHandler( async (req, res) => {
    const {username, password} = req.body

    if (!username){
        res.status(400)
        throw new Error("Please Enter Your Username")
    } else if (!password) {
        res.status(400)
        throw new Error("Enter Your Password")
    }

    // Check for username
    const patient = await Patient.findOne({username})

    if (patient && (await bcrypt.compare(password, patient.password))){
        res.status(200).json({
            message: "Successful Login",
            _id: patient.id,
            username: patient.username,
            name: patient.firstName + patient.lastName,
            email: patient.email,
            token: generateToken(patient._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})

// @desc Request otp
// @route GET /patient/request-otp
// @access Private
const sendOTP = asyncHandler( async(req, res) => {
    const patient = req.user

    const otp = generateOTP()
    patient.passwordResetOTP = otp
    await patient.save()

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'omarelzaher93@gmail.com',
            pass: 'vtzilhuubkdtphww'
        }
    })

      const mailOptions = {
        from: 'omarelzaher93@gmail.com',
        to: patient.email,
        subject: '[NO REPLY] Your Password Reset Request',
        html: `<h1>You have requested to reset your password.<h1>
                <p>Your OTP is ${otp}<p>
                <p>If you did not request to reset your password, you can safely disregard this message.<p>
                <p>We wish you a fruitful experience using El7a2ny!<p>
                <p>This Is An Automated Message, Please Do Not Reply.<p>`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            res.status(500)
            throw new Error("Failed to Send OTP Email.")
        } else {
            res.status(200).json({ message: 'OTP Sent, Please Check Your Email'})
        }
      })
})

// @desc Verify sent otp
// @route POST /patient/verify-otp
// @access Private
const verifyOTP = asyncHandler( async(req, res) => {
    const {otp} = req.body
    const patient = req.user

    if (otp === patient.passwordResetOTP){
        res.status(200).json({message: "Correct OTP"})
    } else {
        res.status(400)
        throw new Error("Invalid OTP Entered")
    }
})

// @desc Reset Password
// @route POST /patient/reset-password
// @access Private
const resetPassword = asyncHandler(async (req, res) => {
    try {
        const { newPassword } = req.body;
        const patient = req.user;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        if (await bcrypt.compare(newPassword, patient.password)) {
            res.status(400).json({message: "New Password Cannot Be The Same As the Old One"});
        } else {
            patient.password = hashedPassword;
            await patient.save();
            res.status(200).json({ message: 'Your Password Has Been Reset Successfuly' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' });
    }
});



  module.exports = 
  { viewMed, searchFilter, addMedicineToCart, createPatient,getPatients, changeCartItemAmount, addAddress, viewListOfOrders, viewOrderDetails, cancelOrder,checkout,viewCartItems,removeCartItems,
    loginPatient, sendOTP, resetPassword, verifyOTP
    }
  

