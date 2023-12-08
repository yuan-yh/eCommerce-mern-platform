import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// middleware
router.use((req, res, next) => {
    console.log(`Time: ${Date.now()}`);
    // pass control to the next middleware function or route handler
    next();
});

// define routes
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;