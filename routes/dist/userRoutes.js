"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../../controllers/dist/userControllers'), welcome = _a.welcome, register = _a.register, login = _a.login, details = _a.details, addToCart = _a.addToCart, updateQuantity = _a.updateQuantity, deleteFromCart = _a.deleteFromCart, purchaseCart = _a.purchaseCart;
var _b = require('../../middlewares/dist/userMiddlewares'), isLoggedInAndAuthenticated = _b.isLoggedInAndAuthenticated, doesUserExist = _b.doesUserExist, encryptPassword = _b.encryptPassword, validatePassword = _b.validatePassword, isAdmin = _b.isAdmin, onlyShopper = _b.onlyShopper;
router
    .get('/welcome', isLoggedInAndAuthenticated, doesUserExist, isAdmin, welcome)
    .post('/register', doesUserExist, validatePassword, encryptPassword, register)
    .post('/login', doesUserExist, validatePassword, login)
    .get('/details', isLoggedInAndAuthenticated, doesUserExist, isAdmin, details)
    .post('/cart/addToCart', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, addToCart)
    .put('/cart/updateQuantity', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, updateQuantity)["delete"]('/cart/deleteFromCart/', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, deleteFromCart)
    .put('/cart/purchase', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, purchaseCart);
module.exports = router;
