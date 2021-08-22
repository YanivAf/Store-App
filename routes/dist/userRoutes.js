"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../../controllers/dist/userController'), welcome = _a.welcome, adminRegister = _a.adminRegister, adminLogin = _a.adminLogin, adminPanel = _a.adminPanel;
var isAdmin = require('../../middlewares/dist/isAdmin').isAdmin;
router
    .get('/welcome', welcome);
router
    .route('/admin')
    .post('/register', adminRegister)
    .post('/login', adminLogin)
    .get('/adminPanel', isAdmin, adminPanel);
module.exports = router;
