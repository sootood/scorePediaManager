import { combineReducers } from 'redux';
import authReducer from './AuthReducers';
import ChartReducer from './ChartReducer';
import EventReducer from './EventReducer';
import ReportReducer from './ReportReducer';

export default combineReducers({
  auth: authReducer,
  chartReducer: ChartReducer,
  eventReducer: EventReducer,
  reportReducer: ReportReducer
});
