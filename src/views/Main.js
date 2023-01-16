import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';

function Main() {
  const user = useSelector((state) => {
    return state.user;
  });

  return <SafeAreaView style={{ height: '100%' }}></SafeAreaView>;
}

export default Main;
