import { createSlice } from '@reduxjs/toolkit';

const modalVo = {
  1000: {
    title: '일시적인 오류가 발생했어요',
    subTitle: '불편을 드려 죄송합니다\n 잠시 후 다시 시도해주시겠어요?',
  },
  1001: {
    title: '서비스 이용 제한 안내',
    subTitle: '서비스 운영 정책 위반으로\n 서비스 이용이 제한되었습니다',
  },
  1002: {
    title: '의견보내기 완료',
    subTitle: '소중한 의견 감사합니다\n 꼼꼼히 확인하고 답변드릴게요!',
  },
};

const modal = createSlice({
  name: 'modal',
  initialState: {
    code: null,
  },
  reducers: {
    get(state, action) {
      return state;
    },
    show(state, action) {
      const { code } = action.payload;
      const { title, subTitle } = modalVo[code];

      state.code = code;
      state.title = title;
      state.subTitle = subTitle;

      return state;
    },
    hide(state, action) {
      state.code = null;
      console.log(state);
      state;
    },
  },
  extraReducers: (_builder) => {},
});

export default modal;
