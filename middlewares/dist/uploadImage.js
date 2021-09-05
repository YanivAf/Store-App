"use strict";
exports.__esModule = true;
exports.uploadImage = exports.storage = void 0;
var multer = require('multer');
var path = require("path");
exports.storage = multer.diskStorage({
    destination: "./public/images/",
    filename: function (req, file, cb) {
        cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
    }
});
exports.uploadImage = multer({
    storage: exports.storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
});
