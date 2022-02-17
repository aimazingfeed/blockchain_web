import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: null,
  balance: 0,
  isConnected: false
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserAddress: (state, action) => {
      state.address = action.payload;
    },
    setUserBalance: (state, action) => {
      state.balance = action.payload;
    },
    setUserIsConnected: (state, action) => {
        state.isConnected = action.payload;
    }
  }
});

export const {
    setUserAddress,
    setUserBalance,
    setUserIsConnected
} = userDataSlice.actions;

export default userDataSlice.reducer;