"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../controllers/userController'), welcome = _a.welcome, register = _a.register, login = _a.login;
router.get('/welcome', welcome);
router.post('/register', register);
router.post('/login', login);
module.exports = router;
