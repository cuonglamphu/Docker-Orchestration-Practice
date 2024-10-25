const { redisClient } = require('../config');

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    await redisClient.hSet(`cart:${userId}`, productId, quantity);
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

// Lấy giỏ hàng từ Redis
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await redisClient.hGetAll(`cart:${userId}`);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart', error });
  }
};

//Delete product from cart
exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    console.log(`Attempting to delete product ${productId} from cart of user ${userId}`);
    const deleteResult = await redisClient.hDel(`cart:${userId}`, productId);
    console.log(`Delete result: ${deleteResult}`);

    if (deleteResult === 0) {
      console.log(`Product ${productId} was not found in the cart of user ${userId}`);
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    const cartAfterDelete = await redisClient.hGetAll(`cart:${userId}`);
    console.log('Cart after deletion:', cartAfterDelete);

    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing from cart', error });
  }
};
