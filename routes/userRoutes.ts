export { };
const express = require('express');
const router = express.Router();

const { welcome, register, login, adminPanel } = require('../../controllers/dist/userController');
const { isAdmin } = require('../../middlewares/dist/isAdmin');

router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login)
    .get('/adminPanel', isAdmin, adminPanel);

module.exports = router;