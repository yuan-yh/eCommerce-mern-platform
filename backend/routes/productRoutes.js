import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

// middleware
router.use((req, res, next) => {
    console.log(`Time: ${Date.now()}`);
    // pass control to the next middleware function or route handler
    next();
});

// define routes
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products)
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const currentProduct = await Product.findById(req.params.id);
    // const currentProduct = products.find((p) => p._id === req.params.id);

    if (currentProduct) return res.json(currentProduct);
    res.status(404).json({ message: 'Product Not Found' });
}));

export default router;