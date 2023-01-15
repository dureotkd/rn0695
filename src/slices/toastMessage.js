import { createSlice } from '@reduxjs/toolkit';

const toastMessage = createSlice({
  name: 'toastMessage',
  initialState: {
    show: false,
    message: '',
  },
  reducers: {
    get(state, action) {
      return state;
    },
    show(state, action) {
      const message = action.payload;
      state.show = true;
      state.message = message;
      return state;
    },
    hide(state, action) {
      state.show = false;
      state;
    },
  },
  extraReducers: (_builder) => {},
});

export default toastMessage;
