"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var _a = require('../../controllers/dist/storeControllers'), showStores = _a.showStores, showProducts = _a.showProducts, showProduct = _a.showProduct, editStoreName = _a.editStoreName, addProduct = _a.addProduct, editProduct = _a.editProduct, deleteProduct = _a.deleteProduct;
var _b = require('../../middlewares/dist/userChecks'), isLoggedIn = _b.isLoggedIn, doesUserExist = _b.doesUserExist, isAdmin = _b.isAdmin, onlyAdmin = _b.onlyAdmin, adminStoreUuid = _b.adminStoreUuid;
// import { isLoggedIn, doesUserExist, isAdmin, onlyAdmin } from '../middlewares/userChecks';
router
    .get('/all', isLoggedIn, doesUserExist, isAdmin, showStores)
    .get('/:storeUuid', isLoggedIn, doesUserExist, isAdmin, showProducts)
    .get('/', isLoggedIn, doesUserExist, isAdmin, showProducts)
    .get('/:productUuid', isLoggedIn, doesUserExist, isAdmin, adminStoreUuid, showProduct)
    .put('/', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, adminStoreUuid, editStoreName)
    .post('/:productUuid', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, adminStoreUuid, addProduct)
    .put('/:productUuid', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, adminStoreUuid, editProduct)["delete"]('/:productUuid', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, adminStoreUuid, deleteProduct);
module.exports = router;
