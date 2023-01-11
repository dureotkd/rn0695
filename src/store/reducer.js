import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '../slices';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export default rootReducer;
