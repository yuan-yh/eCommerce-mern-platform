import express from 'express';
const router = express.Router();
import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
} from '../controllers/orderController.js';
import { protect, buyer, seller, admin, sellerOrAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, buyer, createOrder).get(protect, sellerOrAdmin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, seller, updateOrderToDelivered);

export default router;