const multer = require('multer');
const path = require("path");

export const storage = multer.diskStorage({
    destination: "./public/images/",
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

export const uploadImage = multer({ 
    storage: storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
});