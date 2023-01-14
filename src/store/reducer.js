import { combineReducers } from '@reduxjs/toolkit';
import { userSlice, bottomSheetSlice } from '@src/slices';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  bottomSheet: bottomSheetSlice.reducer,
});

export default rootReducer;
