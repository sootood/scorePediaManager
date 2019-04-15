import React, { Component } from 'react';
// import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { BackHandler, ToastAndroid, BackAndroid } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Actions, Scene, Router } from 'react-native-router-flux';
import LoginForm from './component/LoginForm';
import NowSurvey from './component/NowSurvey';
import LoaderFromTop from './component/LoaderFromTop';
import Menu from './component/Menu';
import EventList from './component/EventList';
import Chart from './component/Chart';
import reducers from './reducers';
// import Router from './Router';
import Analytic from './component/Analytic';
import ReportList from './component/ReportList';

let backButtonPressedOnceToExit = false;

export default class App extends Component {
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackPress.bind(this)
    );
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener(
    //   'hardwareBackPress',
    //   this.onBackPress.bind(this)
    // );
  }

  onBackPress() {
    if (backButtonPressedOnceToExit) {
      BackHandler.exitApp();
    } else {
      if (Actions.currentScene !== 'loader') {
        //base on router
        console.log(Actions.currentScene);
        switch (Actions.currentScene) {
          case '_login':
            Actions.loader();
            return true;
          case '_nowSurvey':
            Actions.loader();
            return true;
          case '_eventList':
            Actions.nowSurvey();
            return true;
          case '_chart':
            Actions.eventList();
            return true;
          case '_reportList':
            Actions.nowSurvey();
            return true;
          case '_analytic':
            Actions.reportList();
            return true;
          default:
            return true;
        }
      } else {
        backButtonPressedOnceToExit = true;
        ToastAndroid.show(
          'Press Back Button again to exit',
          ToastAndroid.SHORT
        );
        //setting timeout is optional
        // setTimeout(() => {
        //   this.backButtonPressedOnceToExit = false;
        // }, 2000);
        return true;
      }
    }
  }
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router backAndroidHandler={this.onBackPress}>
          <Scene key="root">
            <Scene
              key="loader"
              component={LoaderFromTop}
              title=""
              type="replace"
              hideNavBar
            />
            <Scene key="login" component={LoginForm} title="login" hideNavBar />
            <Scene
              key="drawer"
              drawer
              contentComponent={Menu}
              hideNavBar
              drawerWidth={300}
            >
              <Scene
                key="nowSurvey"
                component={sceneProps => (
                  <NowSurvey {...sceneProps} eventCode="" />
                )}
                title="Running survey"
                type="replace"
              />

              <Scene key="eventList" component={EventList} title="Events" />

              <Scene key="chart" component={Chart} title="Report" />
              <Scene key="reportList" component={ReportList} title="Events" />
              <Scene key="analytic" component={Analytic} title="Analytic" />
            </Scene>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
