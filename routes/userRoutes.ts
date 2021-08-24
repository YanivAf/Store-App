export { };
const express = require('express');
const router = express.Router();

const { welcome, register, login, showProducts, showStores } = require('../../controllers/dist/userController');
const { isLoggedIn, doesUserExist, isAdmin, onlyAdmin } = require('../../middlewares/dist/userChecks');

router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login)
    .get('/stores', isLoggedIn, doesUserExist, showStores)
    .get('/store', isLoggedIn, doesUserExist, isAdmin, showProducts);

module.exports = router;