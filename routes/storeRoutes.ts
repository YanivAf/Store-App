export { };
const express = require('express');
const router = express.Router();

const { productSchema } = require('../../schemas/dist/productSchema');
const { validateBody } = require('../../middlewares/dist/validateBody');
const { showStores, showProducts, showProduct, editStoreName, addProduct, editProduct, deleteProduct } = require('../../controllers/dist/storeControllers');
const { isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin } = require('../../middlewares/dist/userMiddlewares');

router
    .get('/list', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showStores)
    .get('/:storeUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showProducts)
    .get('/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, showProduct)
    .put('/', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, editStoreName)
    .post('/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, validateBody(productSchema), addProduct)
    .put('/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, editProduct)
    .delete('/:productUuid', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyAdmin, deleteProduct);

module.exports = router;