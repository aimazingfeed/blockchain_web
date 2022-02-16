import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adress: null,
  balance: 0,
  isConnected: false
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserAdress: (state, action) => {
      state.adress = action.payload;
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
    setUserAdress,
    setUserBalance,
    setUserIsConnected
} = userDataSlice.actions;

export default userDataSlice.reducer;