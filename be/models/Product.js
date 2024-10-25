const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
