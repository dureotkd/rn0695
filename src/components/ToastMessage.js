/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Animated, Text } from 'react-native';
import { COLORS, hp } from '@assets/style/theme';
import { useDispatch } from 'react-redux';
import { toastMessageSlice } from '@src/slices';

function ToastMessage({ message = '' }) {
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animate = new Animated.Value(0);
  const topStyle = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 100],
  });

  React.useEffect(() => {
    Animated.timing(animate, {
      toValue: 1,
      delay: 500,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animate, {
        toValue: 0,
        delay: 1500,
        duration: 350,
        useNativeDriver: false,
      }).start(() => {
        dispatch(toastMessageSlice.actions.hide());
      });
    });
  }, [animate, dispatch]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: topStyle,
        left: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 44,
        backgroundColor: COLORS.grey800,
        borderRadius: 8,
        opacity: 1,
      }}
    >
      <Text style={{ color: '#fff' }}>{message}</Text>
    </Animated.View>
  );
}

export default ToastMessage;
