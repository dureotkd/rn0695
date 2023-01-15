import { login as kakaoLogin, getProfile } from '@react-native-seoul/kakao-login';
import { hp } from '@src/assets/style/theme';
import { bottomSheetSlice, modalSlice } from '@src/slices';
import { empty } from '@src/utils';
import React from 'react';
import { useDispatch } from 'react-redux';

const OauthApi = ({ setUserInfo, setModaldVisible }) => {
  const dispatch = useDispatch();

  const kakaoApi = React.useCallback(async () => {
    try {
      const token = await kakaoLogin();

      if (!token) {
        return;
      }

      /**
       * kakao Profile 데이터 가져오기
       */
      const {
        id = '',
        nickname = '',
        gender = '',
        birthyear = '',
        phoneNumber = '',
        thumbnailImageUrl: profileImage = '',
      } = await getProfile();

      //   성민 null null
      let 기본정보입력으로이동 = true;

      if (!nickname && !gender && !birthyear) {
        기본정보입력으로이동 = false;
      }

      if (기본정보입력으로이동) {
        setUserInfo((prev) => {
          const clonePrev = { ...prev };
          clonePrev.nickname = nickname;
          return clonePrev;
        });

        setModaldVisible(true);
        dispatch(
          bottomSheetSlice.actions.set({
            show: true,
            code: 'A03', // 기본정보 입력으로 바로 이동
            options: {
              height: hp('90%'),
            },
          }),
        );
      }

      /**
       * 서버로 던져주기
       */
    } catch (err) {
      const errorObj = new Error(err);

      /**
       * 그냥 닫기로 취급한 에러는 팝업 안보여줌
       */
      if (errorObj.toString().includes('error 0.')) {
        return;
      }

      /**
       * 비정상적으로 에러발생시 팝업
       */
      dispatch(
        modalSlice.actions.show({
          code: 1000,
          title: 'zzz',
          subTitle: 'zzzz',
        }),
      );
    }
  }, [dispatch]);

  return { kakaoApi };
};

export default OauthApi;
