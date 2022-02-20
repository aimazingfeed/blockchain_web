import { combineReducers } from '@reduxjs/toolkit';
import userDataReducer from './userData/userDataSlice';

export const rootReducer = combineReducers({
    userData: userDataReducer,
});
