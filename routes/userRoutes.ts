export { };
const express = require('express');
const router = express.Router();

const { welcome, register, login } = require('../../controllers/dist/userController');
const { isLoggedIn, doesUserExist, isAdmin, onlyAdmin } = require('../../middlewares/dist/userChecks');
// import { isLoggedIn, doesUserExist, isAdmin, onlyAdmin } from '../middlewares/userChecks';

router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login);

module.exports = router;