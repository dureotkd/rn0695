/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { apiErrorHandler, oauthApi, request } from '@src/apis';
import { COLORS, FONT_SIZE, FONT_WEIGHT, hp, MARGIN, SPACING, wp } from '@src/assets/style/theme';
import { BottomSheet, OauthBtn, OnBoardingLayout, SelectBox, Tag } from '@src/components';
import { local, sex } from '@src/constants';
import { bottomSheetSlice, modalSlice, userSlice } from '@src/slices';
import { ca, empty, wait } from '@src/utils';
import axios from 'axios';
import React, { Suspense } from 'react';
import { TouchableOpacity, SafeAreaView, Text, View, TextInput, Alert, StyleSheet, Animated, ScrollView, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

const 안드로이드컨텐츠높이더하기 = Platform.OS === 'android' ? 50 : 0;
const 안드로이드시트높이더하기 = Platform.OS === 'android' ? 80 : 0;

const 시트컨텐츠높이 = hp('18%') + 안드로이드컨텐츠높이더하기;
const 시트높이 = hp('33.5%') + 안드로이드시트높이더하기;

const 많은정보시트높이 = hp('90%');

const initValue = {
  phoneNumber: '',
  email: '',
  certNumber: '',
  certEmailNumber: '',
  nickname: '',
  age: 45,
  local: local,
  sex: sex,
  selectLocalValue: '',
  selectAgeValue: '',
  charm: '',
  interest: '',
};

const timeGlobalInterval = {
  me: false,
  stop: () => {
    clearInterval(this.me);
  },
};

function Auth() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { bottomSheet } = useSelector((state) => {
    return state;
  });

  const [userInfo, setUserInfo] = React.useState(initValue);
  const [userAge, setUserAge] = React.useState(0);
  React.useEffect(() => {
    let tmpAge = [];
    for (let i = 19; i <= 50; i++) {
      tmpAge.push({
        label: `${i}`,
        value: i,
      });
    }
    setUserAge(tmpAge);
  }, []);
  const [disabled1, disabled2, disabled4, disabled5] = React.useMemo(() => {
    const { certNumber, phoneNumber, certEmailNumber, email } = userInfo;
    const one = phoneNumber.length === 0 ? true : false;
    const two = certNumber.length === 0 ? true : false;
    const four = email.length === 0 ? true : false;
    const five = certEmailNumber.length === 0 ? true : false;
    return [one, two, four, five];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.phoneNumber, userInfo.certNumber, userInfo.email, userInfo.certEmailNumber]);
  const disabled3 = React.useMemo(() => {
    let res = 2;
    if (userInfo.nickname.length > 0) {
      res--;
    }
    userInfo.sex.forEach((item) => {
      if (item.check) {
        res--;
      }
    });
    return res;
  }, [userInfo.sex, userInfo.nickname]);

  const 회원정보받기 = React.useCallback((key, value) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);
  const 번호받았으니인증번호보내자 = React.useCallback(async () => {
    /**
     * 번호 유효성 체크
     */
    const { phoneNumber = '' } = userInfo;

    if (empty(phoneNumber)) {
      Alert.alert('전화번호를 입력해주세요');
      return;
    }

    await 인증번호API('sms');

    /**
     * 다음 페이지로 이동
     */
    다음회원정보받기팝업보여줘(2);
  }, [userInfo, 다음회원정보받기팝업보여줘, 인증번호API]);
  const 이메일받았으니인증번호보내자 = React.useCallback(async () => {
    /**
     * 번호 유효성 체크
     */
    const { email = '' } = userInfo;

    if (empty(email)) {
      Alert.alert('이메일을 입력해주세요');
      return;
    }

    await 인증번호API('email');

    /**
     * 다음 페이지로 이동
     */
    다음회원정보받기팝업보여줘(5);
  }, [userInfo, 다음회원정보받기팝업보여줘, 인증번호API]);

  const 인증번호API = React.useCallback(
    async (certType) => {
      const { phoneNumber = '', email } = userInfo;

      await request
        .post(`/${certType}/cert`, {
          phoneNumber: phoneNumber,
          email: email,
        })
        .then((res) => {})
        .catch(() => {
          setModaldVisible((prev) => !prev);
          apiErrorHandler(dispatch);
        });
    },
    [dispatch, userInfo],
  );

  const 인증번호재전송 = React.useCallback(
    async (certType) => {
      Alert.alert('재전송 되었습니다');
      await 인증번호API(certType);
      setUserInfo((prev) => {
        return {
          ...prev,
          certNumber: '',
          certEmailNumber: '',
        };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [번호받았으니인증번호보내자],
  );
  const 인증번호받았다 = React.useCallback(
    async (certType) => {
      let { certNumber, certEmailNumber, email, phoneNumber } = userInfo;

      let inputInfo = phoneNumber;

      if (certType === 'email') {
        certNumber = certEmailNumber;
        inputInfo = email;
      }

      if (empty(certNumber)) {
        Alert.alert('인증번호를 입력해주세요');
        return;
      }
      /**
       * 인증번호 검증
       */
      const { code } = await request
        .get(`/${certType}/cert`, {
          params: {
            certNumber: certNumber,
            inputInfo: inputInfo,
          },
        })
        .then(({ data }) => {
          return data;
        })
        .catch(() => {
          setModaldVisible((prev) => !prev);
          apiErrorHandler(dispatch);
        });

      if (code !== 'success') {
        return;
      }

      switch (certType) {
        case 'sms':
          다음회원정보받기팝업보여줘(3);
          break;

        case 'email':
          다음회원정보받기팝업보여줘(6);
          break;
      }
    },
    [dispatch, userInfo, 다음회원정보받기팝업보여줘],
  );
  const 성별체크박스체크시 = React.useCallback(
    (value, keyName) => {
      const cloneUserInfo = { ...userInfo };
      cloneUserInfo[keyName] = cloneUserInfo[keyName].map((item) => {
        if (item.value === value) {
          item.check = !item.check;
        } else {
          item.check = false;
        }
        return item;
      });
      setUserInfo(cloneUserInfo);
    },
    [userInfo],
  );
  const 지역셀렉트값변경시 = React.useCallback((value) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        selectLocalValue: value,
      };
    });
  }, []);
  const 나이셀렉트값변경시 = React.useCallback((value) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        selectAgeValue: value,
      };
    });
  }, []);
  const 기본정보서버로보내자 = React.useCallback(async () => {
    const { value: selectSexValue } = userInfo.sex.find((item) => {
      return item.check;
    });

    const nextPage = selectSexValue === 'man' ? 4 : 6;
    다음회원정보받기팝업보여줘(nextPage);
  }, [userInfo.sex, 다음회원정보받기팝업보여줘]);

  const 회원가입처리 = React.useCallback(async () => {
    const { phoneNumber, nickname, selectAgeValue, selectLocalValue, interest, charm } = userInfo;

    const { value: selectSexValue } = userInfo.sex.find((item) => {
      return item.check;
    });

    const { data: loginUser } = await request
      .post('/join', {
        phoneNumber: phoneNumber,
        nickname: nickname,
        age: selectAgeValue,
        sex: selectSexValue,
        local: selectLocalValue,
        interest: interest,
        charm: charm,
      })
      .then((res) => {
        return res;
      })
      .catch(() => {
        setModaldVisible((prev) => !prev);
        apiErrorHandler(dispatch);
      });

    dispatch(
      userSlice.actions.login({
        loginUser: loginUser,
      }),
    );
  }, [dispatch, userInfo]);

  const [modaldVisible, setModaldVisible] = React.useState(false);
  const [bottomSheetDown, setBottomSheetDown] = React.useState(false);
  React.useEffect(() => {
    if (modaldVisible) {
      return;
    }
    setUserInfo(initValue);
  }, [modaldVisible]);
  const 전화번호로그인팝업보여줘 = React.useCallback(async () => {
    setModaldVisible(true);
    setBottomSheetDown(false);
    dispatch(
      bottomSheetSlice.actions.set({
        show: true,
        code: 'A01',
        options: {
          height: 시트높이,
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
          height: next === 3 || next === 6 ? 많은정보시트높이 : 시트높이,
        },
      };

      dispatch(bottomSheetSlice.actions.set(initialState));
      setBottomSheetDown(false);
    },
    [dispatch],
  );

  const [bannerText, setBannerText] = React.useState([
    {
      show: true,
      text: '군인을',
      animate: new Animated.Value(1),
    },
    {
      show: false,
      text: '당신을',
      animate: new Animated.Value(0),
    },
  ]);
  React.useEffect(() => {
    Animated.timing(bannerText[0].animate, {
      toValue: 0,
      duration: 1500,
      delay: 500,
      useNativeDriver: false,
    }).start(async () => {
      const cloneBannerText = [...bannerText];
      cloneBannerText[0].show = false;
      cloneBannerText[1].show = true;
      setBannerText(cloneBannerText);
      Animated.timing(bannerText[1].animate, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [관심사정보, set관심사정보] = React.useState({
    interest: [],
    charm: [],
    jobs: [],
  });
  React.useEffect(() => {
    if (bottomSheet.code !== 'A06') {
      return;
    }
    (async () => {
      const [{ data: interestList }, { data: charmList }] = await Promise.all([request.get('/interest'), request.get('/charm')]);

      const clone관심사정보 = { ...관심사정보 };
      clone관심사정보.interest = interestList;
      clone관심사정보.charm = charmList;
      set관심사정보(clone관심사정보);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomSheet.code]);
  const disabled6 = React.useMemo(() => {
    let cnt = {};

    for (let key in 관심사정보) {
      관심사정보[key].forEach((item) => {
        if (item.check) {
          cnt[key] = 0;
          cnt[key]++;
        }
      });
    }

    return Object.keys(cnt).length === 2 ? false : true;
  }, [관심사정보]);

  const MAX_SELECT = 5;
  const 체크박스체크시 = React.useCallback(
    (value, keyName) => {
      let select_cnt = 0;

      const clone관심사정보 = { ...관심사정보 };

      clone관심사정보[keyName].forEach((item) => {
        if (item.check) {
          select_cnt++;
        }
      });

      clone관심사정보[keyName] = clone관심사정보[keyName].map((item) => {
        if (item.value === value) {
          if (select_cnt !== MAX_SELECT) {
            item.check = !item.check;
          } else if (item.check === false) {
            Alert.alert('최대 5개 가능합니다');
          } else if (item.check === true) {
            item.check = false;
          }
        }
        return item;
      });

      set관심사정보(clone관심사정보);

      const 입력받은관심사정보 = {};

      for (let key in 관심사정보) {
        관심사정보[key].forEach((item) => {
          if (item.check) {
            if (!입력받은관심사정보[key]) {
              입력받은관심사정보[key] = [];
            }
            입력받은관심사정보[key].push(item.value);
          }
        });
      }

      setUserInfo((prev) => {
        return {
          ...prev,
          charm: 입력받은관심사정보?.charm?.join('/'),
          interest: 입력받은관심사정보?.interest?.join('/'),
        };
      });
    },
    [관심사정보],
  );

  /**
   * 소셜로그인 API
   */
  const { kakaoApi, appleApi } = oauthApi({ setUserInfo, setModaldVisible });

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={{ padding: SPACING.layout }}>
        <Text style={{ fontSize: FONT_SIZE.xl }}>군개팅 - 로고</Text>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 0.7 }}>
        <FastImage style={{ width: wp('70'), height: wp('50') }} source={require('@assets/image/couple.png')} />
        <View style={{ marginTop: MARGIN.xxl, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.bannerText}>
            {bannerText.map(({ show, text, animate }, index) => {
              const opacity = animate.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              });
              return (
                <React.Fragment key={`animated-${index}`}>
                  {show && <Animated.Text style={{ opacity: opacity }}>{text}</Animated.Text>}
                </React.Fragment>
              );
            })}{' '}
            <Text>위한</Text>
          </Text>

          <Text style={styles.bannerText}>소개팅</Text>
        </View>
      </View>
      <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
        <OauthBtn
          text="카카오 로그인"
          logo={require('@assets/image/kakao_login_icon.png')}
          bgColor="#FEE500"
          // loading={btnLoading.kakao}
          event={kakaoApi}
          style={{ backgroundColor: '#FEE500' }}
        />
        {Platform.OS === 'ios' && (
          <OauthBtn
            text="Apple 로그인"
            logo={require('@assets/image/apple_logo.png')}
            // loading={btnLoading.apple}
            event={appleApi}
            color="#fff"
            style={{ marginTop: 12, backgroundColor: '#000' }}
          />
        )}
        <TouchableOpacity
          onPress={전화번호로그인팝업보여줘}
          activeOpacity={0.4}
          style={{ marginTop: MARGIN.xxl, borderBottomColor: '#000', borderBottomWidth: 1, paddingBottom: 3 }}
        >
          <Text style={{ fontSize: FONT_SIZE.md }}>전화번호로 로그인</Text>
        </TouchableOpacity>
      </View>
      {bottomSheet.show && (
        <BottomSheet
          modalVisible={modaldVisible}
          setModalVisible={setModaldVisible}
          bottomSheetDown={bottomSheetDown}
          avoidKeyboard={bottomSheet.code === 'A03' || bottomSheet.code === 'A06' ? false : true}
          {...bottomSheet.options}
        >
          {
            {
              /**
               * 전화번호 받자
               */
              A01: (
                <OnBoardingLayout onPress={번호받았으니인증번호보내자} disabled={disabled1}>
                  <View style={{ height: 시트컨텐츠높이 }}>
                    <Text style={styles.des}>전화번호를 입력해주세요</Text>
                    <TextInput
                      autoFocus={true}
                      maxLength={11}
                      keyboardType="numeric"
                      onSubmitEditing={번호받았으니인증번호보내자}
                      style={styles.textInput}
                      placeholder="010-0000-0000 숫자만 입력해주세요"
                      value={userInfo.phoneNumber}
                      onChangeText={회원정보받기.bind(this, 'phoneNumber')}
                    />
                  </View>
                </OnBoardingLayout>
              ),
              /**
               * 인증번호 받자
               */
              A02: (
                <OnBoardingLayout onPress={인증번호받았다.bind(this, 'sms')} disabled={disabled2}>
                  <View style={{ height: 시트컨텐츠높이 }}>
                    <Text style={styles.des}>인증번호를 입력해주세요</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <TextInput
                        autoFocus={true}
                        maxLength={4}
                        keyboardType="numeric"
                        onSubmitEditing={인증번호받았다.bind(this, 'sms')}
                        style={[styles.textInput, { flex: 0.85 }]}
                        value={userInfo.certNumber}
                        placeholder="XXXX"
                        onChangeText={회원정보받기.bind(this, 'certNumber')}
                      />
                      <TouchableOpacity
                        onPress={인증번호재전송.bind(this, 'sms')}
                        activeOpacity={0.4}
                        style={{
                          flex: 0.15,
                          height: hp('4%'),
                          marginTop: MARGIN.lg,
                          marginLeft: MARGIN.md,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 6,
                          backgroundColor: COLORS.other,
                        }}
                      >
                        <Text style={{ fontSize: FONT_SIZE.md, color: '#fff' }}>재전송</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </OnBoardingLayout>
              ),
              /**
               * 기본 정보입력
               * - 닉네임
               * - 성별
               * - 지역
               */
              A03: (
                <OnBoardingLayout disabled={disabled3} onPress={기본정보서버로보내자} text="다음">
                  <View style={{ height: Platform.OS === 'ios' ? hp('74%') : hp('70%') }}>
                    <Text style={styles.des}>기본정보를 입력해주세요</Text>
                    <View style={{ marginTop: MARGIN.xxxl, height: '70%', justifyContent: 'space-between' }}>
                      <View>
                        <Text style={styles.inputDes}>닉네임</Text>
                        <TextInput
                          autoFocus={true}
                          maxLength={10}
                          style={styles.textInput}
                          value={userInfo.nickname}
                          placeholder="홍길동"
                          onChangeText={회원정보받기.bind(this, 'nickname')}
                        />
                      </View>
                      <View>
                        <Text style={styles.inputDes}>지역</Text>
                        <SelectBox
                          list={userInfo.local}
                          placeholder={{
                            label: '지역 선택',
                            inputLabel: '지역 선택',
                            value: '',
                            key: 1,
                          }}
                          onValueChange={지역셀렉트값변경시}
                          selectedValue={userInfo.age}
                        />
                      </View>
                      <View>
                        <Text style={styles.inputDes}>나이</Text>
                        <SelectBox
                          list={userAge}
                          placeholder={{
                            label: '나이 선택',
                            inputLabel: '나이 선택',
                            value: '',
                            key: 1,
                          }}
                          onValueChange={나이셀렉트값변경시}
                          selectedValue={userInfo.age}
                        />
                      </View>
                      <View>
                        <Text style={styles.inputDes}>성별</Text>
                        <View style={{ flexDirection: 'row', marginTop: 6 }}>
                          {userInfo.sex.map((item) => {
                            return (
                              <Tag
                                data={item}
                                key={`tag-${item.value}`}
                                onPress={성별체크박스체크시.bind(this, item.value, 'sex')}
                                colorStyle={{
                                  activeBackgroundColor: COLORS.grey800,
                                  activeColor: '#fff',
                                  inActiveBackgroundColor: COLORS.grey50,
                                  inActiveColor: COLORS.grey800,
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
              /**
               * 나라사랑 이메일 받자 [남자]
               */
              A04: (
                <OnBoardingLayout onPress={이메일받았으니인증번호보내자} disabled={disabled4}>
                  <View style={{ height: 시트컨텐츠높이 }}>
                    <Text style={styles.des}>나라사랑 이메일을 입력해주세요</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <TextInput
                        autoFocus={true}
                        keyboardType="email"
                        onSubmitEditing={이메일받았으니인증번호보내자}
                        style={[styles.textInput, { flex: 0.6 }]}
                        placeholder=""
                        value={userInfo.email}
                        onChangeText={회원정보받기.bind(this, 'email')}
                      />
                      <View style={{ flex: 0.4, paddingBottom: MARGIN.lg, marginLeft: 2 }}>
                        <Text style={{ fontSize: FONT_SIZE.xl, color: COLORS.grey600 }}>@narasarang.or.kr</Text>
                      </View>
                    </View>
                  </View>
                </OnBoardingLayout>
              ),
              /**
               * 나라사랑 이메일 인증번호 받자 [남자]
               */
              A05: (
                <OnBoardingLayout onPress={인증번호받았다.bind(this, 'email')} disabled={disabled5}>
                  <View style={{ height: 시트컨텐츠높이 }}>
                    <Text style={styles.des}>인증번호를 입력해주세요</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <TextInput
                        autoFocus={true}
                        maxLength={4}
                        keyboardType="numeric"
                        onSubmitEditing={인증번호받았다.bind(this, 'email')}
                        style={[styles.textInput, { flex: 0.85 }]}
                        value={userInfo.certEmailNumber}
                        placeholder="XXXX"
                        onChangeText={회원정보받기.bind(this, 'certEmailNumber')}
                      />
                      <TouchableOpacity
                        onPress={인증번호재전송.bind(this, 'email')}
                        activeOpacity={0.4}
                        style={{
                          flex: 0.15,
                          height: hp('4%'),
                          marginTop: MARGIN.lg,
                          marginLeft: MARGIN.md,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 6,
                          backgroundColor: COLORS.other,
                        }}
                      >
                        <Text style={{ fontSize: FONT_SIZE.md, color: '#fff' }}>재전송</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </OnBoardingLayout>
              ),
              /**
               * 관심사 기본정보
               * - 직업
               * - 관심사
               */
              A06: (
                <OnBoardingLayout onPress={회원가입처리} disabled={disabled6}>
                  <Text style={styles.des}>이제 마지막 정보만 입력하면되요</Text>
                  <ScrollView style={{ height: Platform.OS === 'ios' ? hp('71%') : hp('67%') }}>
                    <View>
                      <View style={{ marginTop: MARGIN.xxxl, marginBottom: MARGIN.md, flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={styles.inputDes}>관심사</Text>
                        <Text style={[{ color: 'red' }]}> (최대 5개)</Text>
                      </View>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {관심사정보.interest.length > 0 &&
                          관심사정보.interest.map((item) => {
                            return (
                              <Tag
                                data={item}
                                key={`tag-${item.value}`}
                                onPress={체크박스체크시.bind(this, item.value, 'interest')}
                                buttonStyle={{
                                  width: wp('26%'),
                                  paddingVertical: 8,
                                  paddingHorizontal: 8,
                                }}
                                colorStyle={{
                                  activeBackgroundColor: COLORS.grey800,
                                  activeColor: '#fff',
                                  inActiveBackgroundColor: COLORS.grey50,
                                  inActiveColor: COLORS.grey800,
                                }}
                              />
                            );
                          })}
                      </View>
                    </View>
                    <View>
                      <View style={{ marginTop: MARGIN.xxxl, marginBottom: MARGIN.md, flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={styles.inputDes}>나의 장점</Text>
                        <Text style={[{ color: 'red' }]}> (최대 5개)</Text>
                      </View>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {관심사정보.charm.length > 0 &&
                          관심사정보.charm.map((item) => {
                            return (
                              <Tag
                                data={item}
                                key={`tag-${item.value}`}
                                onPress={체크박스체크시.bind(this, item.value, 'charm')}
                                buttonStyle={{
                                  width: wp('40%'),
                                  paddingVertical: 8,
                                  paddingHorizontal: 8,
                                }}
                                colorStyle={{
                                  activeBackgroundColor: COLORS.grey800,
                                  activeColor: '#fff',
                                  inActiveBackgroundColor: COLORS.grey50,
                                  inActiveColor: COLORS.grey800,
                                }}
                              />
                            );
                          })}
                      </View>
                    </View>
                    <View style={{ height: 100 }} />
                  </ScrollView>
                </OnBoardingLayout>
              ),
            }[bottomSheet.code]
          }
        </BottomSheet>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bannerText: {
    fontSize: FONT_SIZE.xl * 2,
    fontWeight: 'bold',
    lineHeight: 45,
  },
  textInput: {
    paddingTop: MARGIN.xxl,
    paddingBottom: MARGIN.lg,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.regular,
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
  },
  inputDes: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  des: { fontSize: FONT_SIZE.xxxl, fontWeight: FONT_WEIGHT.bold },
});

export default Auth;
