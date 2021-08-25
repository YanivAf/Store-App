"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../../controllers/dist/userController'), welcome = _a.welcome, register = _a.register, login = _a.login;
var _b = require('../../middlewares/dist/userChecks'), isLoggedIn = _b.isLoggedIn, doesUserExist = _b.doesUserExist, isAdmin = _b.isAdmin, onlyAdmin = _b.onlyAdmin;
// import { isLoggedIn, doesUserExist, isAdmin, onlyAdmin } from '../middlewares/userChecks';
router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login);
module.exports = router;
