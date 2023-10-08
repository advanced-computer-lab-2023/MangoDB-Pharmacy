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

const editMedPrice =asyncHandler( async (req,res) =>{
    const med = await Medicine.findById(req.params.id)
    if(!med)
    {
        res.status(400)
        throw new Error('not found ')
    }


    //const newPrice= req.body.price
    //med.price=newPrice
    //
    const updatedMed = await Medicine.findByIdAndUpdate(req.params.id, req.body.price, {new: true})
    res.status(200).json(updatedMed)
})

const editMedDetails =asyncHandler( async (req,res) =>{
    const med = await Medicine.findById(req.params.id)
    if(!med)
    {
        res.status(400)
        throw new Error('not found ')
    }
    // const updatedMed = await Medicine.findByIdAndUpdate(req.params.id, req.body, {new: true})
    const newDetails= req.body.details;
    med.details = newdetails;
    const updatedMed = await med.save();
    res.status(200).json(updatedMed)
})

module.exports = { addMedicine,
    getMedicine,
    editMedPrice,
    editMedDetails,
 };