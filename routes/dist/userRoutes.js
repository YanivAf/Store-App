"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var userSchema = require('../../schemas/dist/userSchema').userSchema;
var validateBody = require('../../middlewares/dist/validateBody').validateBody;
var _a = require('../../middlewares/dist/userMiddlewares'), isLoggedInAndAuthenticated = _a.isLoggedInAndAuthenticated, doesUserExist = _a.doesUserExist, encryptPassword = _a.encryptPassword, validatePassword = _a.validatePassword, isAdmin = _a.isAdmin, onlyShopper = _a.onlyShopper;
var _b = require('../../middlewares/dist/storeMiddlewares'), doesStoreExist = _b.doesStoreExist, doesProductExist = _b.doesProductExist, enoughInStock = _b.enoughInStock, allMallProducts = _b.allMallProducts;
var _c = require('../../controllers/dist/userControllers'), welcome = _c.welcome, register = _c.register, login = _c.login, logout = _c.logout, details = _c.details, updateQuantity = _c.updateQuantity, updateSaved = _c.updateSaved, purchaseCart = _c.purchaseCart;
router
    .post('/register', validateBody(userSchema), doesUserExist, validatePassword, encryptPassword, register)
    .post('/login', doesUserExist, validatePassword, login)
    .get('/logout', isLoggedInAndAuthenticated, doesUserExist, logout);
router.use(isLoggedInAndAuthenticated, doesUserExist, isAdmin);
router
    .get('/welcome', welcome)
    .get('/details', details);
router.use('/cart', onlyShopper, doesStoreExist, doesProductExist, enoughInStock);
router
    .put('/cart', updateQuantity)
    .put('/cart/purchase', purchaseCart);
router.put('/saved', onlyShopper, updateSaved);
// function isWorking(req, res, next) {console.log('working');console.log(req.body);next();}
module.exports = router;
// TODO for registered admins - option to join existing store with storeUuid + joinStoreToken (expires after 6h per store)
