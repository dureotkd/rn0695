import { hp } from '@src/assets/style/theme';
import React from 'react';
import { Animated, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

import VerticalViewPager from 'react-native-vertical-view-pager';
import PagerView from 'react-native-pager-view';

function Main() {
  return (
    <PagerView orientation="vertical" style={{ flex: 1 }}>
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  container: {},
  view: {
    backgroundColor: 'blue',
    height: hp('100%'),
    borderRadius: 10,
  },
  view2: {
    backgroundColor: 'red',
    height: hp('100%'),
    borderRadius: 10,
  },
});

export default Main;
