const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
};

//add product
exports.addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};
