import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] };
// : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // User/rating/numReviews/reviews are not necessary in the cart.
            // const { user, rating, numReviews, reviews, ...item } = action.payload;
            const item = action.payload;
            // check if it is already in the cart
            const existItem = state.cartItems.find((x) => x._id === item._id);

            // If the same item is added, the original one in the cart will be replaced with the new item.
            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state, item);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        //         saveShippingAddress: (state, action) => {
        //             state.shippingAddress = action.payload;
        //             localStorage.setItem('cart', JSON.stringify(state));
        //         },
        //         savePaymentMethod: (state, action) => {
        //             state.paymentMethod = action.payload;
        //             localStorage.setItem('cart', JSON.stringify(state));
        //         },
        //         clearCartItems: (state, action) => {
        //             state.cartItems = [];
        //             localStorage.setItem('cart', JSON.stringify(state));
        //         },
        //         // NOTE: here we need to reset state for when a user logs out so the next
        //         // user doesn't inherit the previous users cart and shipping
        //         resetCart: (state) => (state = initialState),
    },
});

export const {
    addToCart,
    removeFromCart,
    //     saveShippingAddress,
    //     savePaymentMethod,
    //     clearCartItems,
    //     resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;