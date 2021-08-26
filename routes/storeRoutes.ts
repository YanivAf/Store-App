export { };
const express = require('express');
const router = express.Router();

const { showStores, showProducts, showProduct, editStoreName, addProduct, editProduct, deleteProduct } = require('../../controllers/dist/storeControllers');
const { isLoggedIn, doesUserExist, isAdmin, onlyAdmin, adminStoreUuid } = require('../../middlewares/dist/userChecks');
// import { isLoggedIn, doesUserExist, isAdmin, onlyAdmin } from '../middlewares/userChecks';

router
    .get('/all', isLoggedIn, doesUserExist, isAdmin, showStores)
    .get('/:storeUuid', isLoggedIn, doesUserExist, isAdmin, showProducts)
    .get('/', isLoggedIn, doesUserExist, isAdmin, showProducts)
    .get('/:productUuid', isLoggedIn, doesUserExist, isAdmin, adminStoreUuid, showProduct)
    .put('/', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, adminStoreUuid, editStoreName)
    .post('/:productUuid', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, adminStoreUuid, addProduct)
    .put('/:productUuid', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, adminStoreUuid, editProduct)
    .delete('/:productUuid', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, adminStoreUuid, deleteProduct);

module.exports = router;