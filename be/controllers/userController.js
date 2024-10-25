const crypto = require('crypto');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const hashedPassword = hashPassword(password);

    const newUser = new User({
      username,
      password: hashedPassword,
      email
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // create token JWT
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
