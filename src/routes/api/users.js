const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController');
const setTimestamp = require('../../middleware/timestampMiddleware');

router.route('/register')
.post(setTimestamp, registerController.createNewUser);

router.route('/login');

router.route('/update');

module.exports = router;

