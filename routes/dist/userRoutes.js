"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../../controllers/dist/userControllers'), welcome = _a.welcome, register = _a.register, login = _a.login, details = _a.details, addToCart = _a.addToCart, updateQuantity = _a.updateQuantity, deleteFromCart = _a.deleteFromCart, purchaseCart = _a.purchaseCart;
var _b = require('../../middlewares/dist/userChecks'), isLoggedInAndVerified = _b.isLoggedInAndVerified, doesUserExist = _b.doesUserExist, isAdmin = _b.isAdmin, onlyShopper = _b.onlyShopper;
router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login)
    .get('/details', isLoggedInAndVerified, doesUserExist, isAdmin, details)
    .post('/cart/addToCart', isLoggedInAndVerified, doesUserExist, isAdmin, onlyShopper, addToCart)
    .put('/cart/updateQuantity', isLoggedInAndVerified, doesUserExist, isAdmin, onlyShopper, updateQuantity)["delete"]('/cart/deleteFromCart/', isLoggedInAndVerified, doesUserExist, isAdmin, onlyShopper, deleteFromCart)
    .put('/cart/purchase', isLoggedInAndVerified, doesUserExist, isAdmin, onlyShopper, purchaseCart);
module.exports = router;
