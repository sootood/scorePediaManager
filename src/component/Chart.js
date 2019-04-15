import React, { Component } from 'react';
import { FlatList, View, AsyncStorage } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import Toast from 'react-native-root-toast';

import { connect } from 'react-redux';
import {
  getChartData,
  getNowEvent,
  filterChertEvent,
  clearToast
} from '../actions';
import { PieChartUi, FilterChart, BarChartUi } from './commen';

let arrayPie = [];
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
  state = { isBar: false, isPie: false, isCount: true, chartId: '' };

  componentWillMount() {
    this.props.clearToast();
  }
  componentDidMount() {
    // AsyncStorage.getItem('eventId')
    //   .then(value => {
    //     console.log(value);
    //     this.props.getChartData({ eventId: value });
    //   })
    //   .done();

    this.loadData();
  }
  onCountPress() {
    this.setState({ isCount: true });
  }
  onPrecPress() {
    this.setState({ isCount: false });
  }
  async loadData() {
    try {
      await Promise.all([
        AsyncStorage.getItem('eventId'),
        AsyncStorage.getItem('start'),
        AsyncStorage.getItem('end')
      ]).then(data => {
        if (data[0] != null) {
          console.log(data);
          this.setState({ chartId: data[0] });
          this.props.getChartData({
            eventId: data[0],
            start: data[1] === 'T' ? null : data[1],
            end: data[2] === 'T' ? null : data[2]
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  componentDidUpdate() {
    console.log(this.props.noFilterResult);

    if (this.props.noFilterResult !== '') {
      Toast.show(this.props.noFilterResult, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      });
    }
  }

  renderingChart(item) {
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
  }
  onPiePress() {
    this.setState({ isPie: true, isBar: false });
  }
  onBarPress() {
    this.setState({ isPie: false, isBar: true });
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
    console.log(this.state.chartId);
    console.log(endValue);
    console.log(count);

    this.props.filterChertEvent({
      id: Number(this.state.chartId),
      type: endValue,
      count
    });
  }
  renderingUi() {
    if (this.props.dataChart.length !== 0) {
      return (
        <View>
          <FilterChart
            onPiePress={this.onPiePress.bind(this)}
            onBarPress={this.onBarPress.bind(this)}
            onPrecPress={this.onPrecPress.bind(this)}
            onCountPress={this.onCountPress.bind(this)}
          />
          <SwitchSelector
            style={{ marginLeft: 18, marginRight: 18 }}
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
            renderItem={({ item }) => this.renderingChart(item)}
          />
        </View>
      );
    } else {
      return <View />;
    }
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
  noFilterResult: state.chartReducer.noFilterResult
});
export default connect(
  mapStatetoProps,
  { getChartData, getNowEvent, filterChertEvent, clearToast }
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
