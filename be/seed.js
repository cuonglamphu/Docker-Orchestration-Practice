const crypto = require('crypto');
const User = require('./models/User');
const Product = require('./models/Product');

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};


const seedUsers = async () => {
  const users = [
    {
      username: 'testuser1',
      password: hashPassword('password1'), 
      email: 'testuser1@example.com',
    },
    {
      username: 'testuser2',
      password: hashPassword('password2'),
      email: 'testuser2@example.com',
    },
  ];

  for (let user of users) {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      const newUser = new User(user);
      await newUser.save();
      console.log(`Added new user: ${user.username}`);
    } else {
      console.log(`User with email ${user.email} already exists`);
    }
  }

  console.log('User seed data added!');
};

const seedProducts = async () => {
  const products = [
    {
      name: 'Product 1',
      price: 10.0,
      description: 'Sample product 1 description',
    },
    {
      name: 'Product 2',
      price: 20.0,
      description: 'Sample product 2 description',
    },
  ];

  for (let product of products) {
    const existingProduct = await Product.findOne({ name: product.name });
    if (!existingProduct) {
      const newProduct = new Product(product);
      await newProduct.save();
      console.log(`Added new product: ${product.name}`);
    } else {
      console.log(`Product ${product.name} already exists`);
    }
  }

  console.log('Product seed data added!');
};

module.exports = { seedUsers, seedProducts };
