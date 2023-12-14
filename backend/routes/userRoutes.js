import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    getPublicProductById
} from '../controllers/userController.js';
import { protect, seller, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// For "protect, admin", the user must be logged in and is an admin.
router.route('/').post(registerUser).get(protect, admin, getUsers);
// router.post('/auth', authUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/public/:id').get(getPublicProductById);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

export default router;