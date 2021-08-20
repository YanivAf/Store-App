export { };
const express = require('express');
const router = express.Router();

const { welcome, register, login, adminPanel } = require('../controllers/userController');
const { isAdmin } = require('../middlewares/isAdmin');

router
    .get('/welcome', welcome)
    .post('/register', register)
    .post('/login', login)
    .get('/adminPanel', isAdmin, adminPanel);

module.exports = router;