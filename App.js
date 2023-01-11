import store from './src/store';
import React from 'react';

import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacityBase, useColorScheme, View } from 'react-native';
import { Provider, useDispatch } from 'react-redux';

import AppIndex from './AppIndex';

const Section = ({ children, title }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle]}>{title}</Text>
      <Text style={[styles.sectionDescription]}>{children}</Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <AppIndex />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
