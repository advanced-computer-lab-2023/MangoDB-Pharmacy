const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/uploads');
    },
    filename: function (req, file, cb) {
        // Use the original filename without modification
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/png' ||
            file.mimetype === 'application/pdf'
        )
            callback(null, true);
        else callback(null, false);
    },
});

module.exports = upload;