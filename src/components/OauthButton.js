/* eslint-disable react-native/no-inline-styles */
import { FONT_SIZE, hp, MARGIN, wp } from '@src/assets/style/theme';
import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { TouchableOpacity } from 'react-native-gesture-handler';

const OauthBtn = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={props.event}
      style={{
        height: hp('7%'),
        width: wp('90%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        ...props.style,
      }}
    >
      {props.loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.wrap}>
          <FastImage
            style={[
              {
                width: wp('8%'),
                aspectRatio: 1,
                marginRight: MARGIN.md,
              },
            ]}
            source={props.logo}
          />
          <Text style={{ fontSize: FONT_SIZE.xl, fontWeight: '600', color: props.color }}>{props.text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default OauthBtn;
