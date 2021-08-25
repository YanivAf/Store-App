export { };
const express = require('express');
const router = express.Router();

const { showProducts, showStores, addProduct, editProduct, deleteProduct } = require('../../controllers/dist/storeControllers');
const { isLoggedIn, doesUserExist, isAdmin, onlyAdmin } = require('../../middlewares/dist/userChecks');
// import { isLoggedIn, doesUserExist, isAdmin, onlyAdmin } from '../middlewares/userChecks';

router
    .get('/all', isLoggedIn, doesUserExist, showStores)
    .get('/:storeUuid', isLoggedIn, doesUserExist, isAdmin, showProducts)
    .get('/:productUuid', isLoggedIn, doesUserExist, isAdmin, showProducts)
    .post('/addProduct', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, addProduct)
    .put('/:productUuid/editProduct', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, editProduct)
    .delete('/:productUuid/deleteProduct', isLoggedIn, doesUserExist, isAdmin, onlyAdmin, deleteProduct);

module.exports = router;