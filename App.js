import store from './src/store';
import React from 'react';

import { Provider, useDispatch } from 'react-redux';

import AppIndex from './AppIndex';

const App = () => {
  return (
    <Provider store={store}>
      <AppIndex />
    </Provider>
  );
};

export default App;
