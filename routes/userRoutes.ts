export { };
const express = require('express');
const router = express.Router();

const { userSchema } = require('../../schemas/dist/userSchema');
const { validateBody } = require('../../middlewares/dist/validateBody');
const { isLoggedInAndAuthenticated, doesUserExist, encryptPassword, validatePassword, isAdmin, onlyShopper } = require('../../middlewares/dist/userMiddlewares');
const { doesStoreExist, doesProductExist, enoughInStock, allMallProducts } = require('../../middlewares/dist/storeMiddlewares');
const { welcome, register, login, logout, details, updateQuantity, updateSaved, purchaseCart } = require('../../controllers/dist/userControllers');

router
    .post('/register', validateBody(userSchema), doesUserExist, validatePassword, encryptPassword, register)
    .post('/login', doesUserExist, validatePassword, login)
    .get('/logout', isLoggedInAndAuthenticated, doesUserExist, logout);

router.use(isLoggedInAndAuthenticated, doesUserExist, isAdmin);

router
    .get('/welcome', welcome)
    .get('/details', details);

router.use('/cart', onlyShopper, doesStoreExist, doesProductExist, enoughInStock);

router
.put('/cart', updateQuantity)
.put('/cart/purchase', purchaseCart);

router.put('/saved', onlyShopper, updateSaved);

// function isWorking(req, res, next) {console.log('working');console.log(req.body);next();}
module.exports = router;

// TODO for registered admins - option to join existing store with storeUuid + joinStoreToken (expires after 6h per store)