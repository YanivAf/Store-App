export { };
const express = require('express');
const router = express.Router();

import { exampleControllerFunction } from '../controllers/exampleController';

router.get('/', exampleControllerFunction);


module.exports = router;