const multer = require("multer");
const path = require("path");

const storage = (destination) => multer.diskStorage({
    destination: destination,
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileUpload = (destination) => multer({
    storage: storage(destination),
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
    },
    fileFilter: (req, file, cb) => {
        if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg formats are allowed!'));
        }
    },
    onError: function(err, next) {
        console.log('error', err);
        next(err);
    }
}).single('image');

module.exports = fileUpload;
