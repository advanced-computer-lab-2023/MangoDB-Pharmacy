const Pharmacist = require("../models/pharmacistModel");
const Medicine = require("../models/medicineModel");

const asyncHandler = require("express-async-handler");

// const home = (req, res) => {
//     const meds = Medicine.find()
//                          .then((result) => res.render('medicine', { docTitle: "Meds", meds: result }))
//                          .catch(err => console.log(err));
// }

const addMedicine = (req, res) => {
  //
  const medicine = new Medicine(req.body);
  // if (req.file.path) {
  //   const { name, price, use, description, quantity, sales, details } =
  //     req.body;

  //   const medicine = new Medicine({
  //     name,
  //     price,
  //     use,
  //     description,
  //     quantity,
  //     sales,
  //     details,
  //     //picture: req.file.path // save the file path in the 'picture' field
  //   });
  // } else {
  //   const medicine = new Medicine(req.body);
  // }

  medicine
    .save()
    .then((result) => console.log("NEW MEDICINE ADDED:", result))
    .catch((err) => console.log("Please change me I am just an error", err));
  // .catch((err) => console.log(err.toString().substring(0, 55)));
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
const editMedPrice = asyncHandler(async (req, res) => {
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

module.exports = {
  addMedicine,
  getMedicine,
  editMedPrice,
  // editMedDetails,
  viewMed,
  searchFilter,
  getDetails,
};
