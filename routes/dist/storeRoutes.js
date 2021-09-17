"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var multer = require('multer');
var productSchema = require('../../schemas/dist/productSchema').productSchema;
var uploadImage = require('../../middlewares/dist/uploadImage').uploadImage;
var validateBody = require('../../middlewares/dist/validateBody').validateBody;
var _a = require('../../middlewares/dist/userMiddlewares'), isLoggedInAndAuthenticated = _a.isLoggedInAndAuthenticated, doesUserExist = _a.doesUserExist, isAdmin = _a.isAdmin, onlyAdmin = _a.onlyAdmin;
var _b = require('../../middlewares/dist/storeMiddlewares'), doesStoreExist = _b.doesStoreExist, doesProductExist = _b.doesProductExist;
var _c = require('../../controllers/dist/storeControllers'), showStores = _c.showStores, showProducts = _c.showProducts, showProduct = _c.showProduct, editStoreName = _c.editStoreName, addProduct = _c.addProduct, editProduct = _c.editProduct, deleteProduct = _c.deleteProduct;
router
    .use(isLoggedInAndAuthenticated, doesUserExist, isAdmin)
    .use('/:storeUuid', doesStoreExist)
    .use('/:storeUuid/product/:productUuid', doesProductExist);
router
    .get('/list', showStores)
    .get('/:storeUuid', showProducts)
    .get('/:storeUuid/product/:productUuid', showProduct);
router.use('/:storeUuid', onlyAdmin);
router
    .put('/:storeUuid', editStoreName)
    .put('/:storeUuid/product/:productUuid', uploadImage.single('productImage'), validateBody(productSchema), editProduct)
    .post('/:storeUuid/product', uploadImage.single('productImage'), validateBody(productSchema), addProduct)["delete"]('/:storeUuid/product/:productUuid', deleteProduct);
module.exports = router;
// TODO for modifying a store - add middleware to check if the admin is the edited sotre's admin, not just any admin
