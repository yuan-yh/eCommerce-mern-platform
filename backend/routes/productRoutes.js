import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    // deleteProduct,
    // createProductReview,
    // getTopProducts,
} from "../controllers/productController.js";
import { protect, seller, admin } from '../middleware/authMiddleware.js';
// import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

// // middleware
// router.use((req, res, next) => {
//     console.log(`Time: ${Date.now()}`);
//     // pass control to the next middleware function or route handler
//     next();
// });

// define routes
router.route('/').get(getProducts).post(protect, seller, createProduct);
router.route('/:id').get(getProductById).put(protect, seller, updateProduct);

// router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
// router.get('/top', getTopProducts);
// router.route('/:id').get(checkObjectId, getProductById)
//   .put(protect, admin, checkObjectId, updateProduct)
//   .delete(protect, admin, checkObjectId, deleteProduct);

export default router;