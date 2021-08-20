"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../controllers/userController'), welcome = _a.welcome, register = _a.register, login = _a.login, adminPanel = _a.adminPanel;
var isAdmin = require('../middlewares/isAdmin').isAdmin;
router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login)
    .get('/adminPanel', isAdmin, adminPanel);
module.exports = router;
