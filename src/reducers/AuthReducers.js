import {
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_NO_ACCESS
} from '../actions/types';

const INITIOAL_STATE = { email: '', password: '', error: '' };
export default (state = INITIOAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case EMAIL_CHANGE:
      return { ...state, email: action.payload, error: '' };
    case PASSWORD_CHANGE:
      return { ...state, password: action.payload, error: '' };
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: '' };
    case USER_LOGIN_FAILED:
      return {
        ...state,
        error: 'login Faild please check user and password',
        password: ''
      };
    case USER_LOGIN_NO_ACCESS:
      return {
        ...state,
        error: 'you dont have permission to login',
        password: ''
      };
    default:
      return state;
  }
};
