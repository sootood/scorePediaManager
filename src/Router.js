import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './component/LoginForm';
import NowSurvey from './component/NowSurvey';
import LoaderFromTop from './component/LoaderFromTop';
import Menu from './component/Menu';
import EventList from './component/EventList';
import Chart from './component/Chart';
import Analytic from './component/Analytic';
import ReportList from './component/ReportList';

const RouterComponent = () => (
  <Router backAndroidHandler={this.onBackPress}>
    <Scene key="root">
      <Scene
        key="loader"
        component={LoaderFromTop}
        title=""
        type="replace"
        hideNavBar
        initial
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
          component={sceneProps => <NowSurvey {...sceneProps} eventCode="" />}
          title="Running survey"
          type="replace"
        />

        <Scene key="eventList" component={EventList} title="Events" />

        <Scene key="reportList" component={ReportList} title="Events" />
        <Scene key="analytic" component={Analytic} title="Analytic" />

        <Scene key="chart" component={Chart} title="Report" />
      </Scene>
    </Scene>
  </Router>
);

export default RouterComponent;
