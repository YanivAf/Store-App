"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../../controllers/dist/userControllers'), welcome = _a.welcome, register = _a.register, login = _a.login, details = _a.details, addToCart = _a.addToCart, updateQuantity = _a.updateQuantity, deleteFromCart = _a.deleteFromCart, purchaseCart = _a.purchaseCart;
var _b = require('../../middlewares/dist/userChecks'), isLoggedIn = _b.isLoggedIn, doesUserExist = _b.doesUserExist, isAdmin = _b.isAdmin, onlyShopper = _b.onlyShopper, adminStoreUuid = _b.adminStoreUuid;
router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login)
    .post('/details', isLoggedIn, doesUserExist, isAdmin, adminStoreUuid, details)
    .post('/cart/addToCart', isLoggedIn, doesUserExist, isAdmin, onlyShopper, addToCart)
    .put('/cart/updateQuantity', isLoggedIn, doesUserExist, isAdmin, onlyShopper, updateQuantity)["delete"]('/cart/deleteFromCart/', isLoggedIn, doesUserExist, isAdmin, onlyShopper, deleteFromCart)
    .put('/cart/purchase', isLoggedIn, doesUserExist, isAdmin, onlyShopper, purchaseCart);
module.exports = router;
