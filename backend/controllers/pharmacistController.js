const Pharmacist = require('../models/pharmacistModel')
const Medicine = require('../models/medicineModel')

const addMedicine = (req, res) => {
    const medicine = new Medicine(req.body);

    medicine.save()
            .then((result) => console.log('NEW MEDICINE ADDED:', result))
            .catch((err) => console.log(err));
}

module.exports = { addMedicine };