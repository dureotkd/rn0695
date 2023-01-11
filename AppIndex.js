import { userSlice } from './src/slices';
import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
function AppIndex() {
  const dispatch = useDispatch();

  useSelector((state) => {
    console.log(state.user);
  });

  return (
    <SafeAreaView>
      <Pressable
        onPress={() => {
          dispatch(
            userSlice.actions.set({
              name: 'zz',
            }),
          );
        }}
      >
        <Text>zz</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default AppIndex;
