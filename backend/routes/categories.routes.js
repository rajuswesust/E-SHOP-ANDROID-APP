const express = require('express');
const { getCategories, postCategory, deleteCategory, getCategory, updateCategory } = require('../controllers/categories.controller');

const router = express.Router();

router.get('/', getCategories);

router.get('/:id', getCategory)

router.post('/', postCategory);

router.put('/:id', updateCategory);

router.delete('/:id', deleteCategory);

module.exports = router;