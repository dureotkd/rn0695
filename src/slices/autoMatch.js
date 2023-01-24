import { createSlice } from '@reduxjs/toolkit';

const autoMatch = createSlice({
  name: 'autoMatch',
  initialState: {
    start: false,
    matchSeq: null,
  },
  reducers: {
    get(state, action) {
      return state;
    },
    async set(state, action) {
      return state;
    },
    handle(state, action) {
      const { start } = action.payload;

      console.log(start);
      state.start = start;
      return state;
    },
  },
  extraReducers: (_builder) => {},
});

export default autoMatch;
