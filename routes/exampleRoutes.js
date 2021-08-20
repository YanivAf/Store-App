"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var exampleController_1 = require("../controllers/exampleController");
router.get('/', exampleController_1.exampleControllerFunction);
module.exports = router;
