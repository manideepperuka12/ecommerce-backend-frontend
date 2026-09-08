import Product from '../models/Product.js';

// @desc    Fetch all available products from inventory
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new custom store product listing
// @route   POST /api/products
export const createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      stock,
      imageUrl
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
