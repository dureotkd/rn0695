import { BottomSheet, OauthBtn } from '@src/components';
import { bottomSheetSlice } from '@src/slices';
import { wait } from '@src/utils';
import React from 'react';
import { TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

function Auth() {
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = React.useState({
    kakao: false,
  });
  const { bottomSheet } = useSelector((state) => {
    return state;
  });

  const [modaldVisible, setModaldVisible] = React.useState(false);
  const [bottomSheetDown, setBottomSheetDown] = React.useState(false);

  const 전화번호로그인팝업보여줘 = React.useCallback(() => {
    setModaldVisible(true);
    setBottomSheetDown(false);
    dispatch(
      bottomSheetSlice.actions.set({
        show: true,
        code: 'A01',
      }),
    );
  }, [dispatch]);

  const 다음회원정보받기팝업보여줘 = React.useCallback(
    async (next = 1) => {
      setBottomSheetDown(true);
      await wait(250);
      dispatch(
        bottomSheetSlice.actions.set({
          code: `A0${next}`,
        }),
      );
      setBottomSheetDown(false);
    },
    [dispatch],
  );

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 18 }}>군개팅 - 로고</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 0.75 }}>
        <FastImage style={{ width: 175, aspectRatio: 1, borderRadius: 30 }} source={require('@assets/image/man.png')} />
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold' }}>AAA</Text>
          <Text style={{ fontSize: 28, fontWeight: 'bold' }}>AAA</Text>
        </View>
      </View>
      <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
        <OauthBtn
          text="카카오 로그인"
          logo={require('@assets/image/kakao_login_icon.png')}
          bgColor="#FEE500"
          loading={btnLoading.kakao}
          event={() => {}}
        />
        <TouchableOpacity
          onPress={전화번호로그인팝업보여줘}
          activeOpacity={0.4}
          style={{ marginTop: 20, borderBottomColor: '#000', borderBottomWidth: 1, paddingBottom: 3 }}
        >
          <Text style={{ fontSize: 17 }}>전화번호로 로그인</Text>
        </TouchableOpacity>
      </View>
      {bottomSheet.show && (
        <BottomSheet
          modalVisible={modaldVisible}
          setModalVisible={setModaldVisible}
          bottomSheetDown={bottomSheetDown}
          {...bottomSheet.options}
        >
          {
            {
              A01: (
                <View>
                  <TouchableOpacity onPress={다음회원정보받기팝업보여줘.bind(this, 2)}>
                    <Text>이용약관~</Text>
                  </TouchableOpacity>
                </View>
              ),
              A02: (
                <View>
                  <TouchableOpacity onPress={다음회원정보받기팝업보여줘.bind(this, 3)}>
                    <Text>전화번호를 입력해주세요</Text>
                  </TouchableOpacity>
                </View>
              ),
              A03: (
                <View>
                  <Text>군번을 입력해주세요</Text>
                </View>
              ),
            }[bottomSheet.code]
          }
        </BottomSheet>
      )}
    </SafeAreaView>
  );
}

export default Auth;
