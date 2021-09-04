"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var productSchema = require('../../schemas/dist/productSchema').productSchema;
var validateBody = require('../../middlewares/dist/validateBody').validateBody;
var _a = require('../../controllers/dist/storeControllers'), showStores = _a.showStores, showProducts = _a.showProducts, showProduct = _a.showProduct, editStoreName = _a.editStoreName, addProduct = _a.addProduct, editProduct = _a.editProduct, deleteProduct = _a.deleteProduct;
var _b = require('../../middlewares/dist/userMiddlewares'), isLoggedInAndAuthenticated = _b.isLoggedInAndAuthenticated, doesUserExist = _b.doesUserExist, isAdmin = _b.isAdmin, onlyAdmin = _b.onlyAdmin;
router
    .get('/list', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showStores)
    .get('/:storeUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showProducts)
    .get('/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showProduct)
    .put('/', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, editStoreName)
    .post('/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, validateBody(productSchema), addProduct)
    .put('/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, editProduct)["delete"]('/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, deleteProduct);
module.exports = router;
