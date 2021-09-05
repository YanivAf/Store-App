"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var userSchema = require('../../schemas/dist/userSchema').userSchema;
var validateBody = require('../../middlewares/dist/validateBody').validateBody;
var _a = require('../../middlewares/dist/userMiddlewares'), isLoggedInAndAuthenticated = _a.isLoggedInAndAuthenticated, doesUserExist = _a.doesUserExist, encryptPassword = _a.encryptPassword, validatePassword = _a.validatePassword, isAdmin = _a.isAdmin, onlyShopper = _a.onlyShopper;
var _b = require('../../middlewares/dist/storeMiddlewares'), doesProductExist = _b.doesProductExist, enoughInStock = _b.enoughInStock;
var _c = require('../../controllers/dist/userControllers'), welcome = _c.welcome, register = _c.register, login = _c.login, logout = _c.logout, details = _c.details, updateQuantity = _c.updateQuantity, deleteFromCart = _c.deleteFromCart, purchaseCart = _c.purchaseCart;
router
    .get('/welcome', isLoggedInAndAuthenticated, doesUserExist, isAdmin, welcome)
    .post('/register', validateBody(userSchema), doesUserExist, validatePassword, encryptPassword, register)
    .post('/login', doesUserExist, validatePassword, login)
    .get('/logout', isLoggedInAndAuthenticated, doesUserExist, logout)
    .get('/details', isLoggedInAndAuthenticated, doesUserExist, isAdmin, details)
    .put('/cart', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, doesProductExist, enoughInStock, updateQuantity)
    .put('/cart/purchase', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, purchaseCart);
module.exports = router;
