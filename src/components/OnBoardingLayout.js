/* eslint-disable react-native/no-inline-styles */
import { COLORS } from '@src/assets/style/theme';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

function OnBoardingLayout({ children, onPress, disabled, text = '다음' }) {
  return (
    <View style={{ flex: 1, padding: 18, marginTop: 8 }} onStartShouldSetResponder={() => true}>
      {children}
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.4}
        style={{
          backgroundColor: disabled ? COLORS.grey300 : COLORS.primary,
          padding: 12,
          height: 60,
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default OnBoardingLayout;
