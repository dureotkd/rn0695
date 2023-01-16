import store from './src/store';
import React, { Suspense } from 'react';
import { Provider, useDispatch } from 'react-redux';
import('./ReactotronConfig').then(() => {});

import AppIndex from './AppIndex';

const App = () => {
  return (
    <Provider store={store}>
      <AppIndex />
    </Provider>
  );
};

export default App;
