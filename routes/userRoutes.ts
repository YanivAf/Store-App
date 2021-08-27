export { };
const express = require('express');
const router = express.Router();

const { welcome, register, login, details, addToCart, updateQuantity, deleteFromCart, purchaseCart } = require('../../controllers/dist/userControllers');
const { isLoggedInAndVerified, doesUserExist, isAdmin, onlyShopper } = require('../../middlewares/dist/userChecks');

router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login)
    .get('/details', isLoggedInAndVerified, doesUserExist, isAdmin, details)
    .post('/cart/addToCart', isLoggedInAndVerified, doesUserExist, isAdmin, onlyShopper, addToCart)
    .put('/cart/updateQuantity', isLoggedInAndVerified, doesUserExist, isAdmin, onlyShopper, updateQuantity)
    .delete('/cart/deleteFromCart/', isLoggedInAndVerified, doesUserExist, isAdmin, onlyShopper, deleteFromCart)
    .put('/cart/purchase', isLoggedInAndVerified, doesUserExist, isAdmin, onlyShopper, purchaseCart);

module.exports = router;