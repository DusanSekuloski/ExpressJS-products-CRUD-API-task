const express = require('express');
const router = express.Router();
const categoriesController = require('../../controllers/categoriesController');
const setTimestamp = require('../../middleware/timestampMiddleware');

router.route('/')
.get(categoriesController.getAllCategories)
.post(setTimestamp, categoriesController.createCategory);

router.route('/:category_id')
.get(categoriesController.getCategoryById)
.put(setTimestamp, categoriesController.updateCategory)
.delete(categoriesController.deleteCategory);

module.exports = router;
