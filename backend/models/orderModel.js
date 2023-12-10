import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    // The user account for buyer
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // An array of user accounts for sellers
    seller: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // [] indicates that it will be an array of objects.
    orderItems: [{
        name: { type: String, required: true },     // Product name
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product' }
    }],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        email: { type: String }
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;