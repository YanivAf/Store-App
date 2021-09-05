"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var multer = require('multer');
var productSchema = require('../../schemas/dist/productSchema').productSchema;
var uploadImage = require('../../middlewares/dist/uploadImage').uploadImage;
var validateBody = require('../../middlewares/dist/validateBody').validateBody;
var _a = require('../../middlewares/dist/userMiddlewares'), isLoggedInAndAuthenticated = _a.isLoggedInAndAuthenticated, doesUserExist = _a.doesUserExist, isAdmin = _a.isAdmin, onlyAdmin = _a.onlyAdmin;
var doesProductExist = require('../../middlewares/dist/storeMiddlewares').doesProductExist;
var _b = require('../../controllers/dist/storeControllers'), showStores = _b.showStores, showProducts = _b.showProducts, showProduct = _b.showProduct, editStoreName = _b.editStoreName, addProduct = _b.addProduct, editProduct = _b.editProduct, deleteProduct = _b.deleteProduct;
router
    .get('/list', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showStores)
    .get('/:storeUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showProducts)
    .get('/product/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, doesProductExist, showProduct)
    .put('/', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, editStoreName)
    .put('/product/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, uploadImage.single('productImage'), validateBody(productSchema), editProduct)
    .post('/addProduct', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, uploadImage.single('productImage'), validateBody(productSchema), addProduct)["delete"]('/product/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, deleteProduct);
module.exports = router;
