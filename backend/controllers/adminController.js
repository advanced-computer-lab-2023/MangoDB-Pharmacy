const Admin = require('../models/adminModel');
const Pharmacist = require('../models/pharmacistModel');

const add_admin = (req, res) => {
    // create a new Admin instance
    const admin = new Admin(req.body);

    console.log(admin.username,  admin.password)
    res.status(201).json({ message: 'Admin info reached line 9 successfully' });

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

module.exports = { add_admin, add_pharmacist };