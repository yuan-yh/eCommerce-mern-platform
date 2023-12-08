import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products)
});

// @desc    Fetch one product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const currentProduct = await Product.findById(req.params.id);
    // const currentProduct = products.find((p) => p._id === req.params.id);

    if (currentProduct) {
        return res.json(currentProduct);
    } else {
        res.status(404);
        throw new Error('Resource Not Found');
    }
});

export { getProducts, getProductById };