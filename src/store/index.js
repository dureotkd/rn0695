import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import reducer from './reducer';

const store = configureStore({
  reducer,
});

export default store;
export const useAppDispatch = () => useDispatch;
