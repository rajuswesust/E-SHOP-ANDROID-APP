
const express = require('express');
const { getProducts, postProducts, getProduct, updateProduct, deleteProduct, getProductsCount, getFeaturedProducts, updateProductGallery } = require('../controllers/products.controller');
const { uploadSingleImage, uploadMultipleImages } = require('../middlewares/uploadImage.middleware');


const router = express.Router();

router.get("/", getProducts);

router.get('/:id', getProduct);

router.get('/get/count', getProductsCount);

router.get('/get/featured/:id', getFeaturedProducts);

router.post('/', uploadSingleImage, postProducts);

router.put('/:id', updateProduct);

router.put('/gallery/update/:id', uploadMultipleImages, updateProductGallery);

router.delete('/:id', deleteProduct);

module.exports = router;