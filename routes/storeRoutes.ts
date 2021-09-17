export { };
const express = require('express');
const router = express.Router();
const multer = require('multer');

const { productSchema } = require('../../schemas/dist/productSchema');
const { uploadImage } = require('../../middlewares/dist/uploadImage');
const { validateBody } = require('../../middlewares/dist/validateBody');
const { isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin } = require('../../middlewares/dist/userMiddlewares');
const { doesStoreExist, doesProductExist } = require('../../middlewares/dist/storeMiddlewares');
const { showStores, showProducts, showProduct, editStoreName, addProduct, editProduct, deleteProduct } = require('../../controllers/dist/storeControllers');

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
    .post('/:storeUuid/product', uploadImage.single('productImage'), validateBody(productSchema), addProduct)
    .delete('/:storeUuid/product/:productUuid', deleteProduct);

module.exports = router;

// TODO for modifying a store - add middleware to check if the admin is the edited sotre's admin, not just any admin