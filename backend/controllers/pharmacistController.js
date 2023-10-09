const Pharmacist = require('../models/pharmacistModel')
const Medicine = require('../models/medicineModel')

const asyncHandler = require('express-async-handler')

const addMedicine = (req, res) => {
    const medicine = new Medicine(req.body);

    medicine.save()
            .then((result) => console.log('NEW MEDICINE ADDED:', result))
            .catch((err) => console.log(err));
}

const getMedicine = (req, res) => {
    const medicine = Medicine.find()
                             .then((result) => {
                                const out = result.map(med => ({
                                    details: med.details,
                                    price: med.price,
                                    quantity: med.quantity
                                }));

                                console.log(out);

                                res.send(result);
                             })
                             .catch((err) => console.log(err));
}

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
        const updatedMed = await Medicine.findByIdAndUpdate(
            req.params.id,
            { price: req.body.price }, // Update the price field with the new value
            { new: true } //The { new: true } option is used to specify that you want the method to return the updated document after the update is applied. When you set { new: true }, the findByIdAndUpdate method will return the modified document with the new price value.
        );

        if (!updatedMed) {
            res.status(404).json({ message: 'Medicine not found' });
            return;
        }

        res.status(200).json(updatedMed);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
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
const editMedDetails = asyncHandler(async (req, res) => {
    try {
        const updatedMed = await Medicine.findByIdAndUpdate(
            req.params.id,
            { details: req.body.details }, // Update the price field with the new value
            { new: true } //The { new: true } option is used to specify that you want the method to return the updated document after the update is applied. When you set { new: true }, the findByIdAndUpdate method will return the modified document with the new price value.
        );

        if (!updatedMed) {
            res.status(404).json({ message: 'Medicine not found' });
            return;
        }

        res.status(200).json(updatedMed);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

//search medicine based on name 
const searchMedicineByName = asyncHandler(async (req, res) => {
    const medName = req.params.name; // Assuming you pass the name in the URL parameter
  
    try {
        const medicines = await Medicine.find({
            name: { $regex: new RegExp(medName, 'i') } // 'i' for case-insensitive search
  
            //idk la2etha keda :)
            //The $regex operator is used to perform a regular expression search on the name field.
            // The 'i' option in the regex makes the search case-insensitive.
  
  
        });
  
        if (medicines.length === 0) {
            res.status(404).json({ message: 'medicine not found' });
            return;
        }
  
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = { addMedicine,
    getMedicine,
    editMedPrice,
    editMedDetails,
    searchMedicineByName
 };