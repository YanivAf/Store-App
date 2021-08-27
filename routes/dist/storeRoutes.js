"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../../controllers/dist/storeControllers'), showStores = _a.showStores, showProducts = _a.showProducts, showProduct = _a.showProduct, editStoreName = _a.editStoreName, addProduct = _a.addProduct, editProduct = _a.editProduct, deleteProduct = _a.deleteProduct;
var _b = require('../../middlewares/dist/userChecks'), isLoggedInAndVerified = _b.isLoggedInAndVerified, doesUserExist = _b.doesUserExist, isAdmin = _b.isAdmin, onlyAdmin = _b.onlyAdmin;
router
    .get('/all', isLoggedInAndVerified, doesUserExist, isAdmin, showStores)
    .get('/:storeUuid', isLoggedInAndVerified, doesUserExist, isAdmin, showProducts)
    .get('/:productUuid', isLoggedInAndVerified, doesUserExist, isAdmin, showProduct)
    .put('/', isLoggedInAndVerified, doesUserExist, isAdmin, onlyAdmin, editStoreName)
    .post('/:productUuid', isLoggedInAndVerified, doesUserExist, isAdmin, onlyAdmin, addProduct)
    .put('/:productUuid', isLoggedInAndVerified, doesUserExist, isAdmin, onlyAdmin, editProduct)["delete"]('/:productUuid', isLoggedInAndVerified, doesUserExist, isAdmin, onlyAdmin, deleteProduct);
module.exports = router;
