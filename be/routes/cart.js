const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.get('/:userId',authMiddleware, getCart);
router.delete('/:userId/:productId',authMiddleware,  removeFromCart);
module.exports = router;
