export { };
const express = require('express');
const router = express.Router();

const { welcome, adminRegister, adminLogin, adminPanel } = require('../../controllers/dist/userController');
const { isAdmin } = require('../../middlewares/dist/isAdmin');

router
    .get('/welcome', welcome)

router
    .route('/admin')
        .post('/register', adminRegister)
        .post('/login', adminLogin)
        .get('/adminPanel', isAdmin, adminPanel);

module.exports = router;