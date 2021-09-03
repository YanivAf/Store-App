export { };
const express = require('express');
const router = express.Router();

const { userSchema } = require('../../schemas/dist/userSchema');
const { validateBody } = require('../../middlewares/dist/validateBody');
const { isLoggedInAndAuthenticated, doesUserExist, encryptPassword, validatePassword, isAdmin, onlyShopper } = require('../../middlewares/dist/userMiddlewares');
const { doesProductExist, enoughInStock } = require('../../middlewares/dist/storeMiddlewares');
const { welcome, register, login, logout, details, updateQuantity, deleteFromCart, purchaseCart } = require('../../controllers/dist/userControllers');

router
    .get('/welcome', isLoggedInAndAuthenticated, doesUserExist, isAdmin, welcome)
    .post('/register', validateBody(userSchema), doesUserExist, validatePassword, encryptPassword, register)
    .post('/login', doesUserExist, validatePassword, login)
    .get('/logout', isLoggedInAndAuthenticated, doesUserExist, logout)
    .get('/details', isLoggedInAndAuthenticated, doesUserExist, isAdmin, details)
    .put('/cart', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, doesProductExist, enoughInStock, updateQuantity) // only add to cart if exists + in stock
    .delete('/cart', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, deleteFromCart)
    .put('/cart/purchase', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, purchaseCart);

module.exports = router;