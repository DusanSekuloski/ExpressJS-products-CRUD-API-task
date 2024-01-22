const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const setTimestamp = require('../middleware/timestampMiddleware')

router.route('/')
.post(setTimestamp, registerController.registerUser);

module.exports = router;
