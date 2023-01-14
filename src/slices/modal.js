import { createSlice } from '@reduxjs/toolkit';

const modal = createSlice({
  name: 'modal',
  initialState: {
    show: false,
  },
  reducers: {
    get(state, action) {
      return state;
    },
    async set(state, action) {
      const { name } = action.payload;
      state.name = name;

      return state;
    },
  },
  extraReducers: (_builder) => {},
});

export default modal;
