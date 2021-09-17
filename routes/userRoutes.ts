export { };
const express = require('express');
const router = express.Router();

const { userSchema } = require('../../schemas/dist/userSchema');
const { validateBody } = require('../../middlewares/dist/validateBody');
const { isLoggedInAndAuthenticated, doesUserExist, encryptPassword, validatePassword, isAdmin, onlyShopper } = require('../../middlewares/dist/userMiddlewares');
const { doesStoreExist, doesProductExist, enoughInStock } = require('../../middlewares/dist/storeMiddlewares');
const { welcome, register, login, logout, details, updateQuantity, deleteFromCart, purchaseCart } = require('../../controllers/dist/userControllers');

router
    .get('/welcome', isLoggedInAndAuthenticated, doesUserExist, isAdmin, welcome)
    .post('/register', validateBody(userSchema), doesUserExist, validatePassword, encryptPassword, register)
    .post('/login', doesUserExist, validatePassword, login)
    .get('/logout', isLoggedInAndAuthenticated, doesUserExist, logout)
    .get('/details', isLoggedInAndAuthenticated, doesUserExist, isAdmin, details)
    .put('/cart', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, doesStoreExist, doesProductExist, enoughInStock, updateQuantity)
    .put('/cart/purchase', isLoggedInAndAuthenticated, doesUserExist, isAdmin, onlyShopper, purchaseCart);

    // function isWorking(req, res, next) {console.log('working');console.log(req.body);next();}
module.exports = router;

// TODO for registered admins - option to join existing store with storeUuid + joinStoreToken (expires after 6h per store)