import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addLocalCartItem(state, action) {
      const payload = action.payload;
      const existingItem = state.items.find((item) => item.id === payload.id);

      if (existingItem) {
        existingItem.quantity += payload.quantity;
      } else {
        state.items.push(payload);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addLocalCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
