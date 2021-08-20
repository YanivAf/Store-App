export { };
const express = require('express');
const router = express.Router();

const { welcome, register, login } = require('../controllers/userController');

router.get('/welcome', welcome)
router.post('/register', register);
router.post('/login', login);

module.exports = router;