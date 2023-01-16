import store from './src/store';
import React, { Suspense } from 'react';
import { Provider, useDispatch } from 'react-redux';
import('./ReactotronConfig');

import AppIndex from './AppIndex';
import { request } from '@src/apis';
import { local } from '@src/constants';

import AsyncBoundary from './AsyncBoundary';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';

const App = () => {
  return (
    <Provider store={store}>
      <AppIndex />
    </Provider>
  );
};

export default App;
