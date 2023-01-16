import store from './src/store';
import React from 'react';

import { Provider, useDispatch } from 'react-redux';

import Reactotron from 'reactotron-react-native';

import('./ReactotronConfig').then(() => Reactotron.log('Reactotron Configured'));

import AppIndex from './AppIndex';
import { request } from '@src/apis';
import { local } from '@src/constants';

const App = () => {
  React.useEffect(() => {
    (async () => {
      await request
        .get('/login')
        .then((response) => {})
        .catch((error) => {});
    })();
  }, []);

  return (
    <Provider store={store}>
      <AppIndex />
    </Provider>
  );
};

export default App;
