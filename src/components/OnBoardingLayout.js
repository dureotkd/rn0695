import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

function OnBoardingLayout({ children, onPress, disabled, text = '다음' }) {
  return (
    <View style={{ padding: 18, marginTop: 8 }}>
      {children}
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.4}
        style={{
          backgroundColor: disabled ? '#bdbdbd' : '#536349',
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
