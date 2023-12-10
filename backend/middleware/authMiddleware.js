import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            // have the wrong token
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        // have no token
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Check for the BUYER user
const buyer = (req, res, next) => {
    if (req.user && req.user.role === "BUYER") {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as a buyer');
    }
};

// Check for the SELLER user
const seller = (req, res, next) => {
    if (req.user && req.user.role === "SELLER") {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as a seller');
    }
};

// Check for the ADMIN user
const admin = (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

// Check for the SELLER user
const sellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === "SELLER" || req.user.role === "ADMIN")) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as a seller or admin');
    }
};

export { protect, buyer, seller, admin, sellerOrAdmin };