import React from 'react';
import { COLORS } from '@src/assets/style/theme';
import { ActivityIndicator, SafeAreaView } from 'react-native';

function PageLoading() {
  return (
    <SafeAreaView style={{ height: '100%', justifyContent: 'center', backgroundColor: COLORS.bg }}>
      <ActivityIndicator color={COLORS.primary} size="large" />
    </SafeAreaView>
  );
}

export default PageLoading;
