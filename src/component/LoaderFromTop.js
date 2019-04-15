import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';
import { Loader } from './commen';

class LoaderFromTop extends Component {
  state = { token: '' };
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(value => {
        this.setState({ token: value });
      })
      .done();
  }
  componentDidUpdate() {
    if (this.state.token !== null) {
      TimerMixin.setTimeout(() => {
        Actions.nowSurvey({ eventCode: '1' });
      }, 1000);
    } else {
      TimerMixin.setTimeout(() => {
        Actions.login();
      }, 1000);
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          alignContent: 'center',
          backgroundColor: 'white'
        }}
      >
        <Loader />
      </View>
    );
  }
}
export default LoaderFromTop;
