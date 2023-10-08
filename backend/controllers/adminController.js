const Admin = require('../models/adminModel');
const Pharmacist = require('../models/pharmacistModel');
const asyncHandler = require('express-async-handler')



const add_admin = (req, res) => {
    // create a new Admin instance
    const admin = new Admin(req.body);

    console.log(admin.username,  admin.password)
    res.status(201).json({ message: req.body });

    // save the admin to the database
    // admin.save()
    //     .then(result => {
    //         console.log('NEW ADMIN ADDED:', result);
    //         // res.status(201).json({ message: 'Admin added successfully' });
    //     })
    //     .catch(err => {
    //         console.error('Error adding admin:', err);
    //         res.status(500).json({ error: 'Internal Server Error mmmmm' });
    //     });
    
};
const add_pharmacist = (req, res) => {
    // Create a new Pharmacist instance
    const pharmacist = new Pharmacist(req.body);
    console.log(pharmacist.username,  pharmacist.password)
    res.status(201).json({ message: 'pharmacist info reached line 26 successfully' });
    // save the pharmacist to the database
//    
}

const deletePharmacist = asyncHandler(async(req, res) => {
    // Delete a Pharmacist instance
    const pharmacist = await Pharmacist.findOne({username: req.body.text});
    res.status(250).json('Checking...');
    if(!pharmacist){
        res.status(400)
        throw new Error('pharmacist not found')
    }
    await pharmacist.deleteOne()

    res.status(200).json({username: req.params.username.text});
    npm 
    // save the pharmacist to the database
//    
});

module.exports = { add_admin, add_pharmacist, deletePharmacist };