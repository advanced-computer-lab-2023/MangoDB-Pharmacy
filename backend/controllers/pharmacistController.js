const Pharmacist = require("../models/pharmacistModel");
const Medicine = require("../models/medicineModel");
const Order = require("../models/orderModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/userModel");

const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');

const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");  

const getAllPharmacists = asyncHandler(async (req, res) => {
    try {
        const pharmacists = await Pharmacist.find();
        res.status(200).json(pharmacists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

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
const sendMessage2 = async (req, res) => {
    const { messageText, receiverId } = req.body;
    const senderId = req.user._id;//req.user._id;
  
    try {
      // Find the chat based on patientId and doctorId
      const chat = await Chat.findOne({
        $or: [
          { userId1: senderId, userId2: receiverId },
          { userId1: receiverId, userId2: senderId },
        ],
      });
  
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
  
      const newMessage = new Message({
        messageText,
        senderRole : 'pharmacist',
      });
  
      chat.messages.push(newMessage);
  
      await chat.save();
  
      return res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const addMedicine = (req, res) => {
    try {
        const {
            name,
            price,
            use,
            description,
            quantity,
            details,
            prescribed,
            mainActiveIngredient,
            archive,
        } = req.body;

        // Check if req.file is defined before using it
        const medicine = new Medicine({
            name,
            price,
            use,
            description,
            quantity,
            details,
            prescribed,
            mainActiveIngredient,
            archive,

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

    if (pharmacist && (await bcrypt.compare(password, pharmacist.password))) 
    {
      const initials = (pharmacist.firstName ? pharmacist.firstName[0] : '') +
         (pharmacist.lastName ? pharmacist.lastName[0] : '');
        res.status(200).json({
            message: "Successful Login",
            _id: pharmacist.id,
            username: pharmacist.username,
            name: pharmacist.firstName ,
            lastName: pharmacist.lastName,
            email: pharmacist.email,
            initials: initials, 
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
        status: "preparing", // Assuming sales are only considered if the status is "delivered"
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
  
  const getSalesByDate = async (req, res) => {
    try {
      const { date } = req.body;
      console.log(date);
      if (!date) {
        return res.status(400).json({ success: false, error: 'Date is required in the request body.' });
      }
  
      // Convert the incoming date to a JavaScript Date object in UTC
      const selectedDate = new Date(date);
  
      // Ensure the date range covers the entire day in UTC
      const startOfDay = new Date(selectedDate.toISOString().split('T')[0]);
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);
  
      // Query MongoDB for sales within the specified date
      const sales = await Order.find({ dateOfDelivery: { $gte: startOfDay, $lt: endOfDay } });
  if(sales)
      res.json({ success: true, sales });
    else{
        res.json("No orders on this day");
    }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  


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
const getSalesByMedicine = asyncHandler(async (req, res) => {
    try {
      const { medicineName } = req.body; // Assuming the medicineName is passed in the request body
  
      if (!medicineName) {
        res.status(400).json({ error: "MedicineName parameter is required" });
        return;
      }
  
      const sales = await Order.find({
        status: "preparing", // Assuming sales are only considered if the status is "delivered"
        "orderdetails.medicineName": medicineName,
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
        message: `Sales for ${medicineName}`,
        sales: formattedSales,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const getAllSales = asyncHandler(async (req, res) => {
    try {
      const sales = await Order.find({ status: "preparing" }); // Assuming sales are only considered if the status is "delivered"
  
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
        message: "All Sales",
        sales: formattedSales,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  const getDifMeds = asyncHandler(async (req, res) => {
    try {
      const distinctMedicineNames = await Medicine.distinct("name");
  
      res.status(200).json({
        message: "List of Different Medicine Names",
        medicineNames: distinctMedicineNames,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  
 
  
  const getPharmacistById = asyncHandler(async (req, res) => {
    try {
        const pharmacist = await Pharmacist.findById(req.params.id)

        if (pharmacist) {
            res.status(200).json(pharmacist);
        } else {
            res.status(400).json({ message: "Pharmacist not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

const getDoctorById = asyncHandler(async (req, res) => {
  try {
      const doctor = await Doctor.findById(req.params.id)

      if (doctor) {
          res.status(200).json(doctor);
      } else {
          res.status(400).json({ message: "doctor not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});

const viewArchivedMeds = asyncHandler(async (req, res) => {
    try {
        const medicines = await Medicine.find({ archive: true });
        medicines.forEach((medicine) => {});

        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

const unarchiveMedicine = asyncHandler(async (req, res) => {
    try {
        const { medicineName } = req.body; // Assuming the medicine name is sent in the request body

        // Find the medicine by name and update the 'archive' attribute to false
        const updatedMedicine = await Medicine.findOneAndUpdate(
            { name: medicineName },
            { $set: { archive: false } },
            { new: true }
        );

        if (!updatedMedicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.status(200).json(updatedMedicine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

const archiveMedicine = asyncHandler(async (req, res) => {
    try {
        const { medicineName } = req.body; // Assuming the medicine name is sent in the request body

        console.log(medicineName)
        // Find the medicine by name and update the 'archive' attribute to false
        const updatedMedicine = await Medicine.findOneAndUpdate(
            { name: medicineName },
            { $set: { archive: true } },
            { new: true }
        );

        if (!updatedMedicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.status(200).json(updatedMedicine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

const clearNotifs = async (req, res) => {
    const pharmacistId = req.user._id;
    const { id } = req.body;

    try {
        await Pharmacist.updateOne(
            { _id: pharmacistId },
            { $pull: { notifications: { _id: id } } }
        );
        
        res.status(200).json({ message: "Success" })
    } catch(error) {
        res.status(404).json({ error: error.message });
    }

}

const seenNotifs = async (req, res) => {
    try {
        const pharmacistId = req.user._id;
        const pharmacist = await Pharmacist.findById(pharmacistId);
    
        pharmacist.notifications.map((notification) => {
            if (!notification.seen) {
                notification.seen = true;
            }
        })
    
        await pharmacist.save();
    
        res.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message });
    }
}

const createChat2 = async (req, res) => {
    const {  doctorFirstName, doctorLastName } = req.body;
  
    try {
      const pharmacistId =  req.user._id;
      const doctor = await Doctor.findOne({
        firstName: doctorFirstName,
        lastName: doctorLastName,
      });
      if (!doctor) {
        return res.status(404).json({ error: 'doctor not found' });
      }
  
      const newChat = new Chat({
        userId1: pharmacistId,
        userId2: doctor._id,
        messages: [],
      });
  
      await newChat.save();
  
      return res.status(201).json(newChat);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getChat2 = async (req, res) => {
    try {
      const pharmacistId = req.user._id;

      const recieverId = req.body.doctorId; 
      console.log(recieverId);

      const chat = await Chat.findOne({
        $or: [
          { userId1: pharmacistId, userId2: recieverId },
          { userId1: recieverId, userId2: pharmacistId },
        ],
      }).populate('messages'); // Populate the messages field
        console.log(chat);
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
  
      return res.status(200).json(chat);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const viewChats2 = async (req, res) => {
    try {
      const pharmacistId = req.user._id;
      const chats = await Chat.find({ userId1: pharmacistId });     
  
      const formattedChats = await Promise.all(
        chats.map(async (chat) => {
          const doctor = await User.findOne({ _id: chat.userId2 });
          // Get the last message
          const lastMessage =
            chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1]
              : 'No messages';
  
          // Include the chat in the result only if there are messages
          return lastMessage !== 'No messages'
            ? {
                doctor: doctor
                  ? {
                      firstName: doctor.firstName,
                      lastName: doctor.lastName,
                      id : doctor._id,
                    }
                  : null,
                lastMessage,
              }
            : null;
        })
      );
  
      // Remove entries with no messages
      const filteredChats = formattedChats.filter((chat) => chat !== null);
  
      console.log("the formatted doctor chats", filteredChats);
      res.status(200).json(filteredChats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getAllDoctors = asyncHandler(async (req, res) => {
    try {
      const pharmacistId = req.user._id;
  
      const pharmacistChats = await Chat.find({ userId1: pharmacistId });
  
      const doctorIdsWithChat = pharmacistChats.map(chat => chat.userId2);
  
      const doctors = await Doctor.find({ _id: { $nin: doctorIdsWithChat } });
  
      res.status(200).json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  const viewChats = async (req, res) => {
    try {
      const pharmacistId = req.user._id;
      console.log(pharmacistId)
      const chats = await Chat.find({
        $or: [{ userId1: pharmacistId }, { userId2: pharmacistId }],
      });
  
      const formattedChats = await Promise.all(
        chats.map(async (chat) => {
  let   patient= null;
  console.log(chat.userId1 , "chat user 1")

            patient = await User.findOne({ _id:chat.userId1 });
            console.log(patient)

          if ( patient !== null && patient.userType !== 'patient' ) {
              patient= null;
          }
          // Get the last message
          const lastMessage =
            chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1]
              : 'No messages';
  
          // Include the chat in the result only if there are messages and patient is not null
          return lastMessage !== 'No messages' && patient
            ? {
                patient: {
                  firstName: patient.firstName,
                  lastName: patient.lastName,
                  id: patient._id,
                },
                lastMessage,
              }
            : null;
        })
      );
  
      const filteredChats = formattedChats.filter(
        (chat) => chat !== null && chat.patient !== null
      );
       
      console.log("the formatted chats", filteredChats);
      res.status(200).json(filteredChats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const getChat = async (req, res) => {
  
    try {
      const pharmacistId = req.user._id;
      const recieverId = req.body.patientId;
  console.log ("the receiver ",recieverId,"the pharamcist ",pharmacistId);

      console.log(recieverId);

      const chat = await Chat.findOne({
        $or: [
          { userId1: pharmacistId, userId2: recieverId },
          { userId1: recieverId, userId2: pharmacistId },
        ],
      }).populate('messages'); // Populate the messages field
  
        console.log(chat);
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
  
      return res.status(200).json(chat);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const sendMessage = async (req, res) => {

    const { messageText, receiverId } = req.body;
    const senderId = req.user._id;//req.user._id;
  
    try {
      // Find the chat based on patientId and doctorId
      const chat = await Chat.findOne({
        $or: [
          { userId1: senderId, userId2: receiverId },
          { userId1: receiverId, userId2: senderId },
        ],
      });
  
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
  
      const newMessage = new Message({
        messageText,
        senderRole : 'pharmacist',
      });
  
      chat.messages.push(newMessage);
  
      await chat.save();
  
      return res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
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
    getSalesByMedicine,
    getSalesByMonth,
    getAllSales,
    getDifMeds,
    getSalesByDate,
    resetPassword,
    viewPharmacists,
    getPharmacist,
    getPharmacistByEmail,
    changePassword,getPharmacistById,
    viewArchivedMeds,
    unarchiveMedicine,
    archiveMedicine,
    getAllPharmacists,
    clearNotifs,
    seenNotifs,
    createChat2,
    sendMessage2,
    getChat2,
    viewChats2,
    getAllDoctors,
    getDoctorById,getChat,viewChats,sendMessage

};