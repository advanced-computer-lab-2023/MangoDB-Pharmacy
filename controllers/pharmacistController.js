const Medicine = require('../models/medicine')

const add_medicine = (req, res) => {
    const medicine = new Medicine();

    medicine.save()
            .then((result) => console.log('NEW PHARMACIST ADDED:', result))
            .catch((err) => console.log(err));
}

module.exports = { add_medicine };