import {
  SUCCED_FETCH_EVENT_LIST,
  FAILD_FETCH_EVENT_LIST
} from '../actions/types';

const INITIOAL_STATE = { data: '', error: '' };
export default (state = INITIOAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case SUCCED_FETCH_EVENT_LIST:
      return { ...state, data: action.payload };
    case FAILD_FETCH_EVENT_LIST:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
