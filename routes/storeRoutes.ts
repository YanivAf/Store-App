export { };
const express = require('express');
const router = express.Router();

const { showStores, showProducts, showProduct, editStoreName, addProduct, editProduct, deleteProduct } = require('../../controllers/dist/storeControllers');
const { isLoggedInAndVerified, doesUserExist, isAdmin, onlyAdmin } = require('../../middlewares/dist/userChecks');

router
    .get('/all', isLoggedInAndVerified, doesUserExist, isAdmin, showStores)
    .get('/:storeUuid', isLoggedInAndVerified, doesUserExist, isAdmin, showProducts)
    .get('/:productUuid', isLoggedInAndVerified, doesUserExist, isAdmin, showProduct)
    .put('/', isLoggedInAndVerified, doesUserExist, isAdmin, onlyAdmin, editStoreName)
    .post('/:productUuid', isLoggedInAndVerified, doesUserExist, isAdmin, onlyAdmin, addProduct)
    .put('/:productUuid', isLoggedInAndVerified, doesUserExist, isAdmin, onlyAdmin, editProduct)
    .delete('/:productUuid', isLoggedInAndVerified, doesUserExist, isAdmin, onlyAdmin, deleteProduct);

module.exports = router;