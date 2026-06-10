import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    ids: [],
  },
  reducers: {},
});

export default wishlistSlice.reducer;
