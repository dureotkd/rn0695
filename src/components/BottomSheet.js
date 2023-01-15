/* eslint-disable react-native/no-inline-styles */
import { COLORS, wp } from '@src/assets/style/theme';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, PanResponder, Pressable, ScrollView, Text, Keyboard, Platform } from 'react-native';
import Modal from 'react-native-modal';

const BottomSheet = ({ modalVisible, setModalVisible, avoidKeyboard, bottomSheetDown, height, children, buttonComponent }) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => false,
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  // const backAction = () => {
  //   // closeModal();

  //   console.log('??');

  //   return true;
  // };

  // React.useLayoutEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  // }, [backAction]);

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible, resetBottomSheet]);

  useEffect(() => {
    if (bottomSheetDown) {
      closeBottomSheet.start();
    }
  }, [bottomSheetDown, closeBottomSheet]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  const closeTouchModal = (e) => {
    const overlayHeight = screenHeight - height;
    const touchY = e.nativeEvent.pageY;
    const overLayTouch = overlayHeight > touchY ? true : false;

    if (overLayTouch) {
      closeBottomSheet.start(() => {
        setModalVisible(false);
      });
    }
  };

  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      return;
    }

    function onKeyboardDidShow(e) {
      // Remove type here if not using TypeScript
      if (keyboardHeight > 0) {
        return;
      }

      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }

    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const resultHeight = avoidKeyboard ? height + keyboardHeight : height;

  return (
    <Modal deviceWidth={1} avoidKeyboard={avoidKeyboard} visible={modalVisible} animationType={'fade'} transparent statusBarTranslucent>
      <Pressable onPress={closeTouchModal} style={styles.overlay}>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            height: resultHeight,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={styles.etcs} />
            <Text>{''}</Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.bottomSheetContainer}>
            {children}
          </ScrollView>
          {buttonComponent && buttonComponent()}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  background: {
    flex: 1,
  },
  etcs: {
    backgroundColor: COLORS.grey200,
    width: 34,
    height: 5,
    position: 'absolute',
    top: 10,
    borderRadius: 100,
  },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 15,
  },
});
export default BottomSheet;
