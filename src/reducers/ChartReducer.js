import {
  SUCCED_FETCH_CHART_DATA,
  FAILD_FETCH_CHART_DATA,
  FAILD_NOW_SURVEY,
  SUCCEED_NOW_SURVEY,
  FAILD_FILTER_NOW_SERVEY,
  SUCCEED_FILTER_NOW_SERVEY,
  NORESULT_FILTER_NOW_SERVEY,
  UPDATE_PROPS,
  SUCCED_FETCH_CHART_NORESULT,
  EMPTY_NOW_SURVEY
} from '../actions/types';

const INITIOAL_STATE = {
  data: '',
  error: '',
  isBar: false,
  isPie: false,
  noFilterResult: ''
};
export default (state = INITIOAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case SUCCED_FETCH_CHART_DATA:
      return {
        ...state,
        data: action.payload,
        isBar: true,
        isPie: false,
        rentalFlag: 1
      };
    case FAILD_FETCH_CHART_DATA:
      return { ...state, error: action.payload };
    case FAILD_NOW_SURVEY:
      return {
        ...state,
        error: action.payload,
        noFilterResult: '',
        rentalFlag: 0
      };
    case SUCCEED_NOW_SURVEY:
      return {
        ...state,
        error: '',
        data: action.payload,
        isBar: true,
        isPie: false,
        noFilterResult: '',
        rentalFlag: 1
      };
    case EMPTY_NOW_SURVEY:
      return {
        ...state,
        rentalFlag: 0
      };
    case FAILD_FILTER_NOW_SERVEY:
      return { ...state, error: action.payload, noFilterResult: '' };
    case SUCCEED_FILTER_NOW_SERVEY:
      return {
        ...state,
        error: '',
        data: action.payload,
        isBar: true,
        isPie: false,
        noFilterResult: ''
      };
    case NORESULT_FILTER_NOW_SERVEY:
      return {
        ...state,
        noFilterResult: 'Choosen duration has no report'
      };
    case NORESULT_FILTER_NOW_SERVEY:
      return {
        ...state,
        noFilterResult: 'Choosen duration has no report'
      };
    case SUCCED_FETCH_CHART_NORESULT:
      return {
        ...state,
        noFilterResult: 'Choosen duration has no report'
      };
    case UPDATE_PROPS:
      return {
        ...state,
        noFilterResult: ''
      };
    default:
      return state;
  }
};
