import { createSlice } from '@reduxjs/toolkit';

const bottomSheet = createSlice({
  name: 'bottomSheet',
  initialState: {
    show: false,
    code: 'A01',
    options: {
      height: 300,
    },
  },
  reducers: {
    set(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (_builder) => {},
});

export default bottomSheet;
