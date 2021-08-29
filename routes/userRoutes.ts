export { };
const express = require('express');
const router = express.Router();

const { welcome, register, login, details, getQuantities, addToCart, updateQuantity, deleteFromCart, purchaseCart } = require('../../controllers/dist/userControllers');
const { isLoggedInAndAuthenticated, doesUserExist, encryptPassword, validatePassword, isAdmin, onlyShopper } = require('../../middlewares/dist/userMiddlewares');

router
    .get('/welcome', isLoggedInAndAuthenticated, doesUserExist, isAdmin, welcome)
    .post('/register', doesUserExist, validatePassword, encryptPassword, register)
    .post('/login', doesUserExist, validatePassword, login)
    .get('/details', isLoggedInAndAuthenticated, doesUserExist, isAdmin, details)
    .get('/cart', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, getQuantities)
    .post('/cart', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, addToCart)
    .put('/cart', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, updateQuantity)
    .delete('/cart', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, deleteFromCart)
    .put('/cart/purchase', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, purchaseCart);

module.exports = router;