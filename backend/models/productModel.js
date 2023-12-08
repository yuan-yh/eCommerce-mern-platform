import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
    // Only ADMIN or BUYER can write comments.
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    comment: String
}, {
    timestamps: true
});

const productSchema = new Schema({
    // Only ADMIN or SELLER can add new products.
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: reviewSchema,
    rating: { type: Number, required: true, default: 0.0 },
    numberReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0.0 },
    countInStock: { type: Number, required: true, default: 0 },
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
export default Product;