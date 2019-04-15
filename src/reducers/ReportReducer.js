import {
  SUCCEED_REPORT_DATA,
  FAILD_REPORT_DATA,
  GET_ACCESS,
  PROGRESS_BAR
} from '../actions/types';

const INITIOAL_STATE = {
  data: '',
  error: '',
  totallySucced: true,
  progressOp: 0
};
export default (state = INITIOAL_STATE, action) => {
  console.log(state);
  console.log(action.payload);
  switch (action.type) {
    case SUCCEED_REPORT_DATA:
      return {
        ...state,
        data: action.payload,
        totallySucced: false,
        progressOp: 0
      };
    case FAILD_REPORT_DATA:
      return { ...state, error: action.payload, progressOp: 0 };
    case GET_ACCESS:
      return { ...state, totallySucced: true };
    case PROGRESS_BAR:
      return { ...state, progressOp: 1 };
    default:
      return state;
  }
};
