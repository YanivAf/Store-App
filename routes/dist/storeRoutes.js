"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../../controllers/dist/storeControllers'), showProducts = _a.showProducts, showStores = _a.showStores, addProduct = _a.addProduct, editProduct = _a.editProduct, deleteProduct = _a.deleteProduct;
var _b = require('../../middlewares/dist/userChecks'), isLoggedIn = _b.isLoggedIn, doesUserExist = _b.doesUserExist, isAdmin = _b.isAdmin, onlyAdmin = _b.onlyAdmin;
// import { isLoggedIn, doesUserExist, isAdmin, onlyAdmin } from '../middlewares/userChecks';
router
    .get('/all', isLoggedIn, doesUserExist, showStores)
    .get('/:storeUuid', isLoggedIn, doesUserExist, isAdmin, showProducts)
    .get('/:productUuid', isLoggedIn, doesUserExist, isAdmin, showProducts)
    .post('/addProduct', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, addProduct)
    .put('/:productUuid/editProduct', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, editProduct)["delete"]('/:productUuid/deleteProduct', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, deleteProduct);
module.exports = router;
