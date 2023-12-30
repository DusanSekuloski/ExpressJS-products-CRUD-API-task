const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/productsController');
const setTimestamp = require('../../middleware/timestampMiddleware');

router.route('/')
.get(productsController.getAllProducts)
.post(setTimestamp, productsController.createProduct);

router.route('/:id')
.get(productsController.getProductById)
.put(setTimestamp, productsController.updateNonQuantityProductDetails)
.delete(productsController.deleteProduct);

router.route('/quantity/:id').put(setTimestamp, productsController.updateProductQuantity);

module.exports = router;
