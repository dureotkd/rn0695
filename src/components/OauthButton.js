import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { COLORS, FONT_SIZE, hp, MARGIN } from '@assets/style/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OauthBtn = (props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: props.bgColor,
        width: '85%',
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity activeOpacity={0.4} style={{ marginRight: props.loading ? 0 : 8 }} onPress={props.event}>
        {props.loading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.wrap}>
            <FastImage
              style={[
                {
                  width: 35,
                  aspectRatio: 1,
                  marginRight: 5,
                },
              ]}
              source={props.logo}
            />
            <Text style={{ fontSize: 20, fontWeight: '600' }}>{props.text}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
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
