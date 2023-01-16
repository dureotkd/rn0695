import store from './src/store';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import('./ReactotronConfig');

import AppIndex from './AppIndex';
import { request } from '@src/apis';
import { local } from '@src/constants';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppIndex />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
