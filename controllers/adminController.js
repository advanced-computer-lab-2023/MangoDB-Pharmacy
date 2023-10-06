const Admin = require('../models/admin');
const Pharmacist = require('../models/pharmacist');

const add_admin = (req, res) => {
    // create a new Admin instance
    const admin = new Admin(req.body);

    // save the admin to the database
    admin.save()
        .then(result => {
            console.log('NEW ADMIN ADDED:', result);
            // res.status(201).json({ message: 'Admin added successfully' });
        })
        .catch(err => {
            console.error('Error adding admin:', err);
            // res.status(500).json({ error: 'Internal Server Error' });
        });
};

const add_pharmacist = (req, res) => {
    // Create a new Pharmacist instance
    const pharmacist = new Pharmacist(req.body);

    // save the pharmacist to the database
    pharmacist.save()
              .then((result) => {
                console.log('NEW PHARMACIST ADDED:', result);
              })
              .catch((err) => console.log(err));
}

module.exports = { add_admin, add_pharmacist };
