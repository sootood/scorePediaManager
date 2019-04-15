import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  EMAIL_CHANGE,
  PASSWORD_CHANGE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  SUCCED_FETCH_CHART_DATA,
  FAILD_FETCH_CHART_DATA,
  SUCCED_FETCH_EVENT_LIST,
  FAILD_FETCH_EVENT_LIST,
  FAILD_NOW_SURVEY,
  SUCCEED_NOW_SURVEY,
  EMPTY_NOW_SURVEY,
  SUCCEED_FILTER_NOW_SERVEY,
  FAILD_FILTER_NOW_SERVEY,
  NORESULT_FILTER_NOW_SERVEY,
  UPDATE_PROPS,
  SUCCEED_REPORT_DATA,
  FAILD_REPORT_DATA,
  SUCCED_FETCH_CHART_NORESULT,
  GET_ACCESS,
  PROGRESS_BAR,
  USER_LOGIN_NO_ACCESS
} from './types';

const sha256 = require('sha256');

const header = {
  'Content-Type': 'application/json',
  'x-access-token': token
};
let token = AsyncStorage.getItem('token')
  .then(value => {
    header['x-access-token'] = value;
  })
  .done();

export const passwordChange = text => ({
  type: PASSWORD_CHANGE,
  payload: text
});
export const emailChange = text => ({
  type: EMAIL_CHANGE,
  payload: text
});
export const clearToast = () => ({
  type: UPDATE_PROPS
});
export const accessUpdateReport = () => ({
  type: GET_ACCESS
});
export const runProgressbar = () => ({
  type: PROGRESS_BAR
});
export const userLogin = ({ email, pasword }) => dispatch => {
  axios
    .post(
      'http://164.132.119.216:3000/api/user/login',

      {
        username: email,
        password: sha256(pasword)
      }
    )
    .then(response => {
      console.log(response);

      if (response.data.status === 200) {
        if (response.data.data.type === 2) {
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: response.data.data.token
          });
          AsyncStorage.setItem('token', response.data.data.token);
          header['x-access-token'] = response.data.data.token;
          Actions.nowSurvey();
        } else {
          dispatch({
            type: USER_LOGIN_NO_ACCESS,
            data: response.data.data
          });
        }
      } else {
        dispatch({
          type: USER_LOGIN_FAILED,
          data: response.data.data
        });
      }

      console.log(response.data.status);
    })
    .catch(error =>
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: error
      })
    );
};

export const getChartData = ({ eventId, start, end }) => dispatch => {
  dispatch({
    type: UPDATE_PROPS
  });
  axios
    .post(
      'http://164.132.119.216:3000/api/eventdevice/getresultrange',

      {
        eventId,
        start,
        end
      },
      { headers: header }
    )
    .then(response => {
      if (response.data.status === 200) {
        dispatch({
          type: SUCCED_FETCH_CHART_DATA,
          payload: response.data.data
        });
        AsyncStorage.multiSet(
          [['eventId', ''], ['start', ''], ['end', '']],
          data => {
            if (data) {
              //alert('Something went wrong!');
              console.log('clear faield');
            } else {
              // do something if the set was successful
              console.log('clear successful');
            }
          }
        );
      }
    })
    .catch(error =>
      dispatch({
        type: FAILD_FETCH_CHART_DATA,
        payload: error
      })
    );
};

export const getListEvent = () => dispatch => {
  axios
    .get(
      'http://164.132.119.216:3000/api/event/managerevent',

      { headers: header }
    )
    .then(response => {
      console.log(response);

      if (response.data.status === 200) {
        dispatch({
          type: SUCCED_FETCH_EVENT_LIST,
          payload: response.data.data
        });
      }
    })
    .catch(error =>
      dispatch({
        type: FAILD_FETCH_EVENT_LIST,
        payload: error
      })
    );
};

export const getNowEvent = () => dispatch => {
  axios
    .get(
      'http://164.132.119.216:3000/api/event/currentevent',

      { headers: header }
    )
    .then(response => {
      console.log(response);

      if (response.data.status === 200) {
        if (response.data.data !== null) {
          dispatch({
            type: SUCCEED_NOW_SURVEY,
            payload: response.data.data
          });
          AsyncStorage.setItem(
            'runingSurveyId',
            String(response.data.data[0].FLD_PK_EVENT_CO)
          );
        } else {
          dispatch({
            type: EMPTY_NOW_SURVEY,
            payload: response.data.data
          });
        }
      }
    })
    .catch(error =>
      dispatch({
        type: FAILD_NOW_SURVEY,
        payload: error
      })
    );
};
export const filterRunningEvent = ({ id, type, count }) => dispatch => {
  dispatch({
    type: UPDATE_PROPS
  });
  axios
    .post(
      'http://164.132.119.216:3000/api/eventdevice/resultrange',

      {
        id,
        type,
        count,
        end: null
      },
      { headers: header }
    )
    .then(response => {
      if (response.data.status === 200) {
        if (response.data.data.length !== 0) {
          dispatch({
            type: SUCCEED_FILTER_NOW_SERVEY,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: NORESULT_FILTER_NOW_SERVEY
          });
        }
      }
    })
    .catch(error =>
      dispatch({
        type: FAILD_FILTER_NOW_SERVEY,
        payload: error
      })
    );
};

export const filterChertEvent = ({ id, type, count }) => dispatch => {
  dispatch({
    type: UPDATE_PROPS
  });
  axios
    .post(
      'http://164.132.119.216:3000/api/eventdevice/resultrange',

      {
        id,
        type,
        count,
        end: null
      },
      { headers: header }
    )
    .then(response => {
      if (response.data.status === 200) {
        console.log(response.data);
        if (response.data.data.length !== 0) {
          dispatch({
            type: SUCCED_FETCH_CHART_DATA,
            payload: response.data.data
          });
          AsyncStorage.multiSet(
            [['eventId', ''], ['start', ''], ['end', '']],
            data => {
              if (data) {
                //alert('Something went wrong!');
                console.log('clear faield');
              } else {
                // do something if the set was successful
                console.log('clear successful');
              }
            }
          );
        } else {
          dispatch({
            type: SUCCED_FETCH_CHART_NORESULT
          });
        }
      }
    })
    .catch(error =>
      dispatch({
        type: FAILD_FETCH_CHART_DATA,
        payload: error
      })
    );
};

export const reportEvent = ({
  idChart,
  typeDuration,
  startDate,
  endDate
}) => dispatch => {
  axios
    .post(
      'http://164.132.119.216:3000/api/event/reportEvent',

      {
        id: Number(idChart),
        type: Number(typeDuration === '' ? 1 : typeDuration),
        start: startDate.replace('/', '-'),
        end: endDate.replace('/', '-')
      },
      { headers: header }
    )
    .then(response => {
      if (response.data.status === 200) {
        console.log(response.data);
        if (response.data.data.length !== 0) {
          dispatch({
            type: SUCCEED_REPORT_DATA,
            payload: response.data.data
          });
        }
        // else {
        //   dispatch({
        //     type: NORESULT_FILTER_NOW_SERVEY
        //   });
        // }
      }
    })
    .catch(error =>
      dispatch({
        type: FAILD_REPORT_DATA,
        payload: error
      })
    );
};
