import { COLORS, FONT_SIZE, hp, MARGIN } from '@src/assets/style/theme';
import React from 'react';
import { Animated, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

import VerticalViewPager from 'react-native-vertical-view-pager';
import PagerView from 'react-native-pager-view';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { autoMatchSlice, bottomSheetSlice } from '@src/slices';
import { wait } from '@src/utils';
import { BottomSheet } from '@src/components';

function Main() {
  const dispatch = useDispatch();
  const 맞춤추천버튼들 = [
    {
      value: 'A01',
      name: '최근 접속',
    },
    {
      value: 'A02',
      name: '신규가입',
    },
    {
      value: 'A03',
      name: '글래머',
    },
    {
      value: 'A04',
      name: '슬렌더',
    },
    {
      value: 'A05',
      name: '키카 큰',
    },
    {
      value: 'A06',
      name: '연락을 잘하는',
    },
    {
      value: 'A07',
      name: '사차원 매력이 있는',
    },
    {
      value: 'A08',
      name: '집 데이트를 좋아하는',
    },
    {
      value: 'A09',
      name: '목소리가 좋은',
    },
    {
      value: 'A10',
      name: '스킨십을 좋아하는',
    },
  ];

  const {
    autoMatch: { start },
  } = useSelector((state) => {
    return state;
  });

  const 자동매칭Handle = React.useCallback(
    async (type) => {
      dispatch(
        autoMatchSlice.actions.handle({
          start: type,
        }),
      );
    },
    [dispatch],
  );

  const 자동매칭버튼 = {
    start: start ? false : true,
    bgColor: start ? '#f50701' : COLORS.primary,
    text: start ? '멈추기' : '자동매칭',
  };

  return (
    <PagerView orientation="vertical" style={{ flex: 1 }}>
      <View key="1" style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 14, position: 'relative' }}>
        <View style={{ borderRadius: 6, backgroundColor: COLORS.grey600, flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="lightning-bolt" size={100} color={COLORS.black} />
        </View>
        <View style={{ flex: 0.3, marginTop: MARGIN.xxxl, paddingLeft: 12 }}>
          <View style={{ flex: 0.6 }}>
            <Text style={{ fontSize: FONT_SIZE.xxxl, fontWeight: 'bold' }}>빠르고 쉬운 자동매칭을 경험해보세요</Text>
            <View style={{ marginTop: MARGIN.md }}>
              <Text style={{ fontSize: FONT_SIZE.xl, color: COLORS.grey600 }}>현재 접속중인 회원을 만날 수 있어요{'\n'}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={자동매칭Handle.bind(this, 자동매칭버튼.start)}
          activeOpacity={0.7}
          style={[styles.bottomButton, { backgroundColor: 자동매칭버튼.bgColor }]}
        >
          <Text style={{ color: '#fff', fontSize: FONT_SIZE.xl, fontWeight: '600' }}>{자동매칭버튼.text}</Text>
        </TouchableOpacity>
      </View>
      <View key="2" style={{ flex: 1, paddingVertical: 8, paddingHorizontal: 14 }}>
        <View style={{ flex: 0.85 }}>
          <View>
            <Text style={{ fontSize: FONT_SIZE.xxxl, fontWeight: 'bold' }}>맞춤 추천</Text>
          </View>
          <ScrollView>
            {맞춤추천버튼들.map(({ name, value }) => {
              return (
                <View
                  key={value}
                  style={{ marginTop: MARGIN.xxxl, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Text style={{ fontSize: FONT_SIZE.xl }}>{name}</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ backgroundColor: COLORS.black, padding: 12, width: 80, alignItems: 'center', borderRadius: 6 }}
                  >
                    <Text style={{ color: '#fff', fontSize: FONT_SIZE.md, fontWeight: '500' }}>선택</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.bottomButton}>
          <Text style={{ color: '#fff', fontSize: FONT_SIZE.xl, fontWeight: '600' }}>추천 제의하기</Text>
        </TouchableOpacity>
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
  bottomButton: {
    width: '100%',
    height: hp('7.5%'),
    bottom: 10,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Main;
