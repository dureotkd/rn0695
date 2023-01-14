import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    seq: '',
    name: '',
    age: '',
    phoneNumber: '',
    gender: '',
    oauthType: '',
    profiles: ['https://i.ibb.co/M1CG12Q/1-3.png'],
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
    login(state, action) {
      state.seq = 1;
      return state;
    },
    delete() {},
    logout() {},
  },
  extraReducers: (_builder) => {},
});

export default user;
