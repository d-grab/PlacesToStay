const multer = require('multer');
const Path = require("path");

const firstLocation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploaded_images/')
    },
    filename: (req, file, callback) => {
        const file_name = `${Date.now()}${Path.extname(file.originalname)}`
        callback(null, file_name)
    }
});

image_upload_middleware = (req, res, next) => {
    if (!req.isAuthenticated())
        res.status(500).json({message: "booking is only available for logged_in users"});
    else
        multer({storage: firstLocation}).single('file')(req, res, next);
}

module.exports = image_upload_middleware
