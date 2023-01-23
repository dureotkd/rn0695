import React from 'react';
import { Animated, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

function HorizontalSlide({ children }) {
  return (
    <SafeAreaView>
      <Animated.ScrollView
        ref={(scrollView) => {
          this.scrollView = scrollView;
        }}
        style={styles.container}
        horizontal={true}
        decelerationRate={'fast'}
        snapToInterval={width - 60} // 30x2
        snapToAlignment={'center'}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}
      >
        <View style={styles.view}>{children}</View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  view: {
    marginTop: 100,
    backgroundColor: 'blue',
    width: width - 80, // 30x2 + 10x2
    margin: 10,
    height: 200,
    borderRadius: 10,
  },
  view2: {
    marginTop: 100,
    backgroundColor: 'red',
    width: width - 80, // 30x2 + 10x2
    margin: 10,
    height: 200,
    borderRadius: 10,
  },
});

export default HorizontalSlide;
