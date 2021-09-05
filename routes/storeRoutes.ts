export { };
const express = require('express');
const router = express.Router();
const multer = require('multer');

const { productSchema } = require('../../schemas/dist/productSchema');
const { uploadImage } = require('../../middlewares/dist/uploadImage');
const { validateBody } = require('../../middlewares/dist/validateBody');
const { isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin } = require('../../middlewares/dist/userMiddlewares');
const { doesProductExist } = require('../../middlewares/dist/storeMiddlewares');
const { showStores, showProducts, showProduct, editStoreName, addProduct, editProduct, deleteProduct } = require('../../controllers/dist/storeControllers');

router
    .get('/list', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showStores)
    .get('/:storeUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showProducts)
    .get('/product/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, doesProductExist, showProduct)
    .put('/', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, editStoreName)
    .put('/product/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, uploadImage.single('productImage'), validateBody(productSchema), editProduct)
    .post('/addProduct', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, uploadImage.single('productImage'), validateBody(productSchema), addProduct)
    .delete('/product/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, deleteProduct);

module.exports = router;