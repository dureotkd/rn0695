import { modalSlice } from '@src/slices';

function apiErrorHandler(dispatch) {
  dispatch(modalSlice.actions.show({ code: 1000 }));
  throw null;
}

export default apiErrorHandler;
