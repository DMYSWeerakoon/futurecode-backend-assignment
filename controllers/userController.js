const User = require('../models/User');

// Register user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
