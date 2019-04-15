import React, { Component } from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  AsyncStorage,
  Text,
  Image
} from 'react-native';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import SwitchSelector from 'react-native-switch-selector';
import { Actions } from 'react-native-router-flux';
import { getChartData, getNowEvent, filterRunningEvent } from '../actions';
import { PieChartUi, Button, FilterChart, BarChartUi } from './commen';

let arrayPie = [];
let eventIdNowSurvey = null;
const style = {
  backgroundColor: '#00ACC1',
  width: 300,
  height: 120,
  color: '#ffffff',
  fontSize: 15,
  lineHeight: 2,
  lines: 4,
  borderRadius: 15,
  fontWeight: 'bold',
  yOffset: 40
};
class NowSurvey extends Component {
  state = { isBar: false, isPie: false, isCount: false };
  componentDidMount() {
    this.props.getNowEvent();
  }
  onPressList() {
    Actions.eventList();
  }
  onPiePress() {
    this.setState({ isPie: true, isBar: false });
  }
  onBarPress() {
    this.setState({ isPie: false, isBar: true });
  }
  onCountPress() {
    this.setState({ isCount: true });
  }
  onPrecPress() {
    this.setState({ isCount: false });
  }
  componentDidUpdate() {
    AsyncStorage.getItem('runingSurveyId')
      .then(value => {
        eventIdNowSurvey = value;
      })
      .done();
    if (this.props.noFilterResult !== '') {
      Toast.show(this.props.noFilterResult, {
        duration: Toast.durations.Dhort,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  }
  renderingChart(item, index) {
    console.log(this.props);

    if (this.state.isBar) {
      return (
        <BarChartUi
          Xdata={['Excellent', 'Good', 'Fair', 'Poor', 'VeryPoor']}
          data={[
            this.state.isCount === false
              ? parseFloat(item.pANSWER1)
              : item.ANSWER1,
            this.state.isCount === false
              ? parseFloat(item.pANSWER2)
              : item.ANSWER2,
            this.state.isCount === false
              ? parseFloat(item.pANSWER3)
              : item.ANSWER3,
            this.state.isCount === false
              ? parseFloat(item.pANSWER4)
              : item.ANSWER4,
            this.state.isCount === false
              ? parseFloat(item.pANSWER5)
              : item.ANSWER5
          ]}
          titleText={item.FLD_TEXT}
        />
      );
    } else if (this.state.isPie) {
      console.log(arrayPie);
      console.log(item);
      arrayPie = [];
      createArrayPie(item, this.state.isCount);
      return (
        <PieChartUi
          Xdata={['Excellent', 'Good', 'Fair', 'Poor', 'VeryPoor']}
          data={arrayPie}
          titleText={item.FLD_TEXT}
        />
      );
    }
    return (
      <BarChartUi
        Xdata={['Excellent', 'Good', 'Fair', 'Poor', 'VeryPoor']}
        data={[
          !this.state.isCount ? parseFloat(item.pANSWER1) : item.ANSWER1,
          !this.state.isCount ? parseFloat(item.pANSWER2) : item.ANSWER2,
          !this.state.isCount ? parseFloat(item.pANSWER3) : item.ANSWER3,
          !this.state.isCount ? parseFloat(item.pANSWER4) : item.ANSWER4,
          !this.state.isCount ? parseFloat(item.pANSWER5) : item.ANSWER5
        ]}
        titleText={item.FLD_TEXT}
      />
    );
  }

  renderingUi() {
    if (this.props.dataChart.length > 1) {
      return (
        <View>
          <FilterChart
            onPiePress={this.onPiePress.bind(this)}
            onBarPress={this.onBarPress.bind(this)}
            onPrecPress={this.onPrecPress.bind(this)}
            onCountPress={this.onCountPress.bind(this)}
          />
          <SwitchSelector
            style={{ width: '90%', marginLeft: 20 }}
            initial={6}
            onPress={value => this.onSwitcherPress(value)}
            textColor={'#00ACC1'} //'#7a44cf'
            selectedColor={'#00ACC1'}
            buttonColor={'lightgrey'}
            borderColor={'#00ACC1'}
            hasPadding
            options={[
              {
                label: '5H',
                value: '5h'
              },
              {
                label: '1D',
                value: 'd'
              },
              {
                label: '1W',
                value: 'w'
              },
              {
                label: '1M',
                value: 'm'
              },
              {
                label: '3M',
                value: 'm'
              },
              {
                label: '1Y',
                value: 'y'
              },
              {
                label: 'All',
                value: 'a'
              }
            ]}
          />
          <FlatList
            data={this.props.dataChart}
            keyExtractor={(item, index) => JSON.stringify(item.FLD_TEXT)}
            style={{ marginBottom: 290 }}
            renderItem={({ item, index }) => this.renderingChart(item, index)}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Image
            style={{
              height: 80,
              width: '30%',
              alignSelf: 'center',
              margin: 10,
              padding: 10
            }}
            resizeMode="contain"
            source={require('../../assets/img/error.png')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              alignContent: 'center',
              fontWeight: 'bold',
              padding: 5,
              backgroundColor: 'rgba(140, 20, 20 ,0.6)',
              color: 'white'
            }}
          >
            you dont have running event now.
          </Text>
          {this.renderRentalStatus()}

          <Text
            style={{
              textAlign: 'center',
              fontSize: 10,
              alignContent: 'center',
              padding: 5
            }}
          >
            You can access your events by clicking on button below.
          </Text>
          <Button btnText={'My events'} onPress={this.onPressList.bind(this)} />
        </View>
      );
    }
  }
  renderRentalStatus() {
    if (this.props.dataChart.message === -1) {
      return (
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              alignContent: 'center',
              fontWeight: 'bold',
              padding: 5,
              backgroundColor: 'transparent',
              color: 'rgba(140, 20, 20 ,0.6)'
            }}
          >
            Your rental period is over.
          </Text>
        </View>
      );
    }
  }

  onSwitcherPress(value) {
    let endValue;
    let count;
    switch (value) {
      case '5h':
        endValue = 'h';
        count = 5;
        break;
      case '3M':
        endValue = 'm';
        count = 3;
        break;
      case '1M':
        endValue = 'm';
        count = 1;
        break;
      default:
        endValue = value;
        count = 1;
        break;
    }
    this.props.filterRunningEvent({
      id: Number(eventIdNowSurvey),
      type: endValue,
      count
    });
  }

  render() {
    console.log(this.props.eventCode);
    // if (this.props.dataChart !== null) {
    return <View>{this.renderingUi()}</View>;
    //   }
    //   return (
    //     <ActivityIndicator style={styles.indicator} animating size="large" />
    //   );
  }
}
const mapStatetoProps = state => ({
  dataChart: state.chartReducer.data,
  noFilterResult: state.chartReducer.noFilterResult,
  rentalFlag: state.chartReducer.rentalFlag
});
export default connect(
  mapStatetoProps,
  { getChartData, getNowEvent, filterRunningEvent }
)(NowSurvey);
const styles = {
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    color: '#00b894'
  }
};

export function createArrayPie(item, isCount) {
  console.log('in array func');
  console.log(item);
  if (arrayPie.length < 5) {
    if (item.ANSWER1 !== 0) {
      arrayPie.push({
        key: 1,
        amount:
          isCount === false
            ? Number(parseFloat(item.pANSWER1).toFixed(1))
            : item.ANSWER1,
        svg: { fill: '#00a33c' }
      });
    }
    if (item.ANSWER2 !== 0) {
      arrayPie.push({
        key: 2,
        amount:
          isCount === false
            ? Number(parseFloat(item.pANSWER2).toFixed(1))
            : item.ANSWER2,
        svg: { fill: '#5fcf3f' }
      });
    }

    if (item.ANSWER3 !== 0) {
      console.log('in array 3');
      arrayPie.push({
        key: 3,
        amount:
          isCount === false
            ? Number(parseFloat(item.pANSWER3).toFixed(1))
            : item.ANSWER3,
        svg: { fill: '#ffde0a' }
      });
    }

    if (item.ANSWER4 !== 0) {
      arrayPie.push({
        key: 4,
        amount:
          isCount === false
            ? Number(parseFloat(item.pANSWER4).toFixed(1))
            : item.ANSWER4,
        svg: { fill: '#fe6612' }
      });
    }

    if (item.ANSWER5 !== 0) {
      arrayPie.push({
        key: 5,
        amount:
          isCount === false
            ? Number(parseFloat(item.pANSWER5).toFixed(1))
            : item.ANSWER5,
        svg: { fill: '#ec0005' }
      });
    }
  }
  return arrayPie;
}
