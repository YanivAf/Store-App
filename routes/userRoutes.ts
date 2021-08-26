export { };
const express = require('express');
const router = express.Router();

const { welcome, register, login, details, addToCart, updateQuantity, deleteFromCart, purchaseCart } = require('../../controllers/dist/userControllers');
const { isLoggedIn, doesUserExist, isAdmin, onlyShopper, adminStoreUuid } = require('../../middlewares/dist/userChecks');

router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login)
    .post('/details', isLoggedIn, doesUserExist, isAdmin, adminStoreUuid, details)
    .post('/cart/addToCart', isLoggedIn, doesUserExist, isAdmin, onlyShopper, addToCart)
    .put('/cart/updateQuantity', isLoggedIn, doesUserExist, isAdmin, onlyShopper, updateQuantity)
    .delete('/cart/deleteFromCart/', isLoggedIn, doesUserExist, isAdmin, onlyShopper, deleteFromCart)
    .put('/cart/purchase', isLoggedIn, doesUserExist, isAdmin, onlyShopper, purchaseCart);

module.exports = router;