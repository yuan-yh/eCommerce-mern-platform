import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';
// import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/BUYER
const createOrder = asyncHandler(async (req, res) => {
    // res.send('create an order');
    const { orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body;
    // const { orderItems, shippingAddress, paymentMethod } = req.body;

    // check for the empty order without ordering products
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Empty orders');
    } else {
        // console.log(orderItems);
        const order = new Order({
            // orderItems: dbOrderItems,
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined,
            })),
            user: req.user._id,
            seller: orderItems.map((x) => (x.user)),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdAnOrder = await order.save();

        res.status(201).json(createdAnOrder);

        // // NOTE: here we must assume that the prices from our client are incorrect.
        // // We must only trust the price of the item as it exists in
        // // our DB. This prevents a user paying whatever they want by hacking our client
        // // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

        // // get the ordered items from our database
        // const itemsFromDB = await Product.find({
        //     _id: { $in: orderItems.map((x) => x._id) },
        // });

        // // map over the order items and use the price from our items from database
        // const dbOrderItems = orderItems.map((itemFromClient) => {
        //     const matchingItemFromDB = itemsFromDB.find(
        //         (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
        //     );
        //     return {
        //         ...itemFromClient,
        //         product: itemFromClient._id,
        //         price: matchingItemFromDB.price,
        //         _id: undefined,
        //     };
        // });

        // // calculate prices
        // const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        //     calcPrices(dbOrderItems);

        // const order = new Order({
        //     // orderItems: dbOrderItems,
        //     orderItems: orderItems.map((x) => ({
        //         ...x,
        //         product: x._id,
        //         _id: undefined,
        //     })),
        //     user: req.user._id,
        //     seller: orderItems.map((x) => (x.user)),
        //     shippingAddress,
        //     paymentMethod,
        //     itemsPrice,
        //     taxPrice,
        //     shippingPrice,
        //     totalPrice,
        // });

        // const createdAnOrder = await order.save();

        // res.status(201).json(createdAnOrder);
    }
});

// @desc    Get orders for logged-in user only
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    // res.send('get orders for this user');
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    // res.send('get order by id');
    // add the user (name & email) in the order
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // res.send('update order to be paid');
    // verify the payment was made to PayPal before marking the order as paid
    //     const { verified, value } = await verifyPayPalPayment(req.body.id);
    //     if (!verified) throw new Error('Payment not verified');

    //     // check if this transaction has been used before
    //     const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    //     if (!isNewTransaction) throw new Error('Transaction has been used before');

    const order = await Order.findById(req.params.id);

    if (order) {
        //         // check the correct amount was paid
        //         const paidCorrectAmount = order.totalPrice.toString() === value;
        //         if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to delivered - for SELLERS only & ADMIN???
// @route   GET /api/orders/:id/deliver
// @access  Private/SELLER
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order to be delivered');
    //     const order = await Order.findById(req.params.id);

    //     if (order) {
    //         order.isDelivered = true;
    //         order.deliveredAt = Date.now();

    //         const updatedOrder = await order.save();

    //         res.json(updatedOrder);
    //     } else {
    //         res.status(404);
    //         throw new Error('Order not found');
    //     }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/ADMIN
const getOrders = asyncHandler(async (req, res) => {
    res.send('get all orders');
    //     const orders = await Order.find({}).populate('user', 'id name');
    //     res.json(orders);
});

export {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};