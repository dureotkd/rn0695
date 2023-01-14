/* eslint-disable react-native/no-inline-styles */
import { COLORS } from '@src/assets/style/theme';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Modal, Animated, Dimensions, PanResponder, Pressable, ScrollView, Text } from 'react-native';

const BottomSheet = ({ modalVisible, setModalVisible, bottomSheetDown, height, children, buttonComponent }) => {
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

  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent statusBarTranslucent>
      <Pressable onPress={closeTouchModal} style={styles.overlay}>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            height: height,
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
