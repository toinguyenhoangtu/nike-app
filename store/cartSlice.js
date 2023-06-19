import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find(
                (p) => p.id === action.payload.id
            );
            if (item) {
                item.quantity++;
                item.attributes.price = item.oneQuantityPrice * item.quantity;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions

export default cartSlice.reducer