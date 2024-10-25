const express = require('express');
const { getAllProducts, addProduct, getProductById } = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/add', addProduct);
router.get('/:id', getProductById);
module.exports = router;
