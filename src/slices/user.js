import { createSlice } from '@reduxjs/toolkit';

const User = createSlice({
  name: 'user',
  initialState: {
    id: '',
    email: '',
    name: '',
    age: '',
    gender: '',
    oauthId: '',
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
    delete() {},
    login() {},
    logout() {},
  },
  extraReducers: (_builder) => {},
});

export default User;
