import { combineReducers } from '@reduxjs/toolkit';
import { userSlice, bottomSheetSlice, modalSlice, toastMessageSlice } from '@src/slices';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  bottomSheet: bottomSheetSlice.reducer,
  modal: modalSlice.reducer,
  toastMessage: toastMessageSlice.reducer,
});

export default rootReducer;
