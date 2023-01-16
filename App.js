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

const Test = () => {
  const handleError = useErrorHandler();

  React.useEffect(() => {
    (async () => {
      try {
        await request.get('zzsda,ld,l');
      } catch (error) {
        handleError(error);
      }
    })();
  }, []);

  return (
    <SafeAreaView>
      <Text>a</Text>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <ErrorBoundary
      onReset={() => {
        console.log('Reset');
      }}
      fallbackRender={({ error, resetErrorBoundary }) => {
        return (
          <SafeAreaView>
            <TouchableOpacity onPress={resetErrorBoundary}>
              <Text>{error.message}</Text>
              <Text style={{ color: 'red' }}>ErrorErrorErrorErrorErrorError</Text>
            </TouchableOpacity>
          </SafeAreaView>
        );
      }}
    >
      <Provider store={store}>
        <Suspense
          fallback={() => {
            return (
              <SafeAreaView>
                <Text style={{ color: 'blue', color: 'red' }}>Loading...!</Text>
              </SafeAreaView>
            );
          }}
        >
          <AppIndex />
        </Suspense>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
