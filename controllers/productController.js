const Product = require('../models/Product');

// Create product
exports.createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const product = new Product({ name, price, quantity });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single product by id
exports.getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product by id
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, quantity } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product by id
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
