export { };
const express = require('express');
const router = express.Router();

const { welcome, adminRegister, adminLogin, adminPanel } = require('../../controllers/dist/userController');
const { isAdmin } = require('../../middlewares/dist/isAdmin');

router
    .get('/welcome', welcome)
    .post('/admin/register', adminRegister)
    .post('/admin/login', adminLogin)
    .get('/admin/adminPanel', isAdmin, adminPanel);

// router
//     .route('/admin')
//         .post('/register', adminRegister)
//         .post('/login', adminLogin)
//         .get('/adminPanel', isAdmin, adminPanel);

module.exports = router;