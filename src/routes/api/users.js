const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middleware/authenticateToken');
const usersController = require('../../controllers/usersController');

router.route('/').get(usersController.getAllUsers);

router.route('/:id').get(usersController.getUserById).delete(usersController.deleteUser);

router.route('/update').put(authenticateToken, usersController.updateLoggedInUser);

module.exports = router;
