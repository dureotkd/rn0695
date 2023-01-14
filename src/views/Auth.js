import { request } from '@src/apis';
import { COLORS } from '@src/assets/style/theme';
import { BottomSheet, OauthBtn, OnBoardingLayout, Tag } from '@src/components';
import { bottomSheetSlice } from '@src/slices';
import { empty, wait } from '@src/utils';
import React from 'react';
import { TouchableOpacity, SafeAreaView, Text, View, TextInput, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

const initValue = {
  phoneNumber: '',
  certNumber: '',
  nickname: '',
  age: 0,
  local: '',
  sex: [
    {
      id: 'S01',
      name: '여자',
      value: 'woman',
      check: false,
      disabled: false,
    },
    {
      id: 'S02',
      name: '남자',
      value: 'man',
      check: false,
      disabled: false,
    },
  ],
};

function Auth() {
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = React.useState({
    kakao: false,
  });
  const { bottomSheet } = useSelector((state) => {
    return state;
  });

  const [userInfo, setUserInfo] = React.useState(initValue);
  const [disabled1, disabled2] = React.useMemo(() => {
    const { certNumber, phoneNumber } = userInfo;
    const one = phoneNumber.length === 0 ? true : false;
    const two = certNumber.length === 0 ? true : false;
    return [one, two];
  }, [userInfo]);
  const 회원정보받기 = React.useCallback((key, value) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);
  const 전화번호받았다 = React.useCallback(async () => {
    /**
     * 번호 유효성 체크
     */

    const { phoneNumber = '' } = userInfo;

    if (empty(phoneNumber)) {
      Alert.alert('전화번호를 입력해주세요');
      return;
    }

    /**
     * SMS 전송하기
     */
    // await request
    //   .post('/user/sms/login', {
    //     data: phoneNumber,
    //   })
    //   .then((res) => {})
    //   .catch((err) => {});

    /**
     * 다음 페이지로 이동
     */
    다음회원정보받기팝업보여줘(2);
  }, [userInfo, 다음회원정보받기팝업보여줘]);
  const 인증번호받았다 = React.useCallback(async () => {
    const { certNumber } = userInfo;
    if (empty(certNumber)) {
      Alert.alert('인증번호를 입력해주세요');
      return;
    }
    /**
     * 인증번호 검증
     */
    다음회원정보받기팝업보여줘(3);
  }, [userInfo, 다음회원정보받기팝업보여줘]);
  const 기본정보받았다 = React.useCallback(async () => {
    /**
     * 닉네임
     * 지역
     * 성별
     * 나이등등..
     */
  }, []);

  const [modaldVisible, setModaldVisible] = React.useState(false);
  const [bottomSheetDown, setBottomSheetDown] = React.useState(false);
  React.useEffect(() => {
    if (modaldVisible) {
      return;
    }
    setUserInfo(initValue);
  }, [modaldVisible]);
  const 전화번호로그인팝업보여줘 = React.useCallback(() => {
    setModaldVisible(true);
    setBottomSheetDown(false);
    dispatch(
      bottomSheetSlice.actions.set({
        show: true,
        code: 'A01',
        options: {
          height: 300,
        },
      }),
    );
  }, [dispatch]);
  const 다음회원정보받기팝업보여줘 = React.useCallback(
    async (next = 1) => {
      setBottomSheetDown(true);
      await wait(250);

      const initialState = {
        code: `A0${next}`,
        options: {
          height: next === 3 ? 600 : 300,
        },
      };

      dispatch(bottomSheetSlice.actions.set(initialState));
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
        <FastImage style={{ width: 300, height: 200 }} source={require('@assets/image/couple.png')} />
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
                <OnBoardingLayout onPress={전화번호받았다} disabled={disabled1}>
                  <View style={{ height: 150 }}>
                    <Text style={{ fontSize: 22, fontWeight: '600' }}>전화번호를 입력해주세요</Text>
                    <TextInput
                      autoFocus={true}
                      maxLength={11}
                      onSubmitEditing={전화번호받았다}
                      style={{
                        paddingTop: 18,
                        paddingBottom: 8,
                        fontSize: 20,
                        fontWeight: '500',
                        borderBottomColor: '#000',
                        borderBottomWidth: 1,
                      }}
                      placeholder="010-0000-0000 숫자만 입력해주세요"
                      value={userInfo.phoneNumber}
                      onChangeText={회원정보받기.bind(this, 'phoneNumber')}
                    />
                  </View>
                </OnBoardingLayout>
              ),
              A02: (
                <OnBoardingLayout onPress={인증번호받았다} disabled={disabled2}>
                  <View style={{ height: 150 }}>
                    <Text style={{ fontSize: 22, fontWeight: '600' }}>인증번호를 입력해주세요</Text>
                    <TextInput
                      autoFocus={true}
                      maxLength={4}
                      onSubmitEditing={인증번호받았다}
                      style={{
                        paddingTop: 18,
                        paddingBottom: 8,
                        fontSize: 20,
                        fontWeight: '500',
                        borderBottomColor: '#000',
                        borderBottomWidth: 1,
                      }}
                      value={userInfo.certNumber}
                      placeholder="XXXX"
                      onChangeText={회원정보받기.bind(this, 'certNumber')}
                    />
                  </View>
                </OnBoardingLayout>
              ),
              A03: (
                <OnBoardingLayout onPress={기본정보받았다} text="가입 완료">
                  <View style={{ height: 450 }}>
                    <Text style={{ fontSize: 22, fontWeight: '600' }}>기본정보를 입력해주세요</Text>
                    <View style={{ marginTop: 42, height: '65%', justifyContent: 'space-between' }}>
                      <View>
                        <Text style={{ fontSize: 14 }}>닉네임</Text>
                        <TextInput
                          autoFocus={true}
                          maxLength={10}
                          style={{
                            paddingTop: 18,
                            paddingBottom: 8,
                            fontSize: 20,
                            fontWeight: '500',
                            borderBottomColor: '#000',
                            borderBottomWidth: 1,
                          }}
                          value={userInfo.nickname}
                          placeholder="홍길동"
                          onChangeText={회원정보받기.bind(this, 'local')}
                        />
                      </View>
                      <View>
                        <Text style={{ fontSize: 14 }}>지역</Text>
                        <TextInput
                          maxLength={10}
                          style={{
                            paddingTop: 18,
                            paddingBottom: 8,
                            fontSize: 20,
                            fontWeight: '500',
                            borderBottomColor: '#000',
                            borderBottomWidth: 1,
                          }}
                          value={userInfo.nickname}
                          placeholder="홍길동"
                          onChangeText={회원정보받기.bind(this, 'nickname')}
                        />
                      </View>
                      <View>
                        <Text style={{ fontSize: 14 }}>성별</Text>
                        <View style={{ flexDirection: 'row', marginTop: 6 }}>
                          {userInfo.sex.map((item) => {
                            return (
                              <Tag
                                data={item}
                                onPress={() => {}}
                                colorStyle={{
                                  activeBackgroundColor: COLORS.grey800,
                                  activeColor: '#fff',
                                  inActiveBackgroundColor: COLORS.grey50,
                                  inActiveColor: COLORS.grey600,
                                }}
                              />
                            );
                          })}
                        </View>
                      </View>
                    </View>
                  </View>
                </OnBoardingLayout>
              ),
            }[bottomSheet.code]
          }
        </BottomSheet>
      )}
    </SafeAreaView>
  );
}

export default Auth;
