import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

const colors = {
  chartBlue: '#ec0005',
  chartRed: '#fe6612',
  chartYellow: '#ffde0a',
  chartGreen: '#5fcf3f',
  chartDGreen: '#00a33c'
};

export default class BarChart extends Component {
  constructor(props) {
    super(props);
    const { width, height, chart } = this.props;

    this.state = {
      minValue: 0,
      maxValue: 0,
      variation: 0,
      stepX: 0,
      stepY: 0,
      width: width,
      height: height,
      values: chart.values,
      colors: chart.colors,
      length: chart.axis.length,
      axis: chart.axis,
      horizontalLines: []
    };
    this.buildChart();
  }

  componentWillUpdate() {
    this.constructor(this.props);
  }
  buildChart() {
    const { values, width, height, margin, length } = this.state;
    let min = 0;
    let max = 0;
    let variation = 0;
    let marginBottom = 0;
    this.props.chart.values.forEach(section => {
      section.forEach(bar => {
        if (bar < min) min = bar;
        if (bar > max) max = bar;
      });
    });
    this.state.minValue = Math.min(...this.props.chart.values);
    this.state.maxValue = Math.max(...this.props.chart.values);
    if (min < 0) min = min * -1;

    variation = this.state.minValue + this.state.maxValue;
    this.state.variation = variation;
    this.state.height = height;
    marginBottom =
      (Math.abs(this.state.min) / this.state.variation) * this.state.height;
    this.state.marginBottom = marginBottom;
  }

  calcHeight(value: number): any {
    // TODO: Math.round??
    this.state.minValue = Math.min(...this.props.chart.values);
    this.state.maxValue = Math.max(...this.props.chart.values);
    if (value >= 0) {
      let height =
        Math.abs(value) / (this.state.minValue + this.state.maxValue);
      return {
        height: height * (this.state.height - 100)
      };
    } else {
      let height = Math.abs(value) / this.state.variation;
      return {
        height: height * this.state.height,
        bottom: -(height * this.state.height),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
      };
    }
  }

  setHeight() {
    return { height: this.props.height };
  }

  calcMin(): any {
    if (this.state.minValue < 0)
      return {
        paddingBottom:
          (Math.abs(this.state.minValue) / this.state.variation) *
          this.state.height
      };
    else return { paddingBottom: 5 };
  }

  styleContainer(index) {
    const { length } = this.state;
    const { chart } = this.props;
    let borderLeftWidth = 0;
    let paddingLeft = 20;
    let paddingRight = 20;
    let backgroundColor = 'white';
    if (chart.selected == index) {
      backgroundColor = '#FAF9FA';
    }

    if (index != 0) borderLeftWidth = 0.5;

    if (length > 3) {
      paddingLeft = 2;
      paddingRight = 2;
    }
    return {
      backgroundColor: backgroundColor,
      borderLeftWidth: borderLeftWidth,
      paddingRight: paddingRight,
      paddingLeft: paddingLeft - 2
    };
  }
  render() {
    const {
      width,
      height,
      minValue,
      maxValue,
      variation,
      values,
      stepX,
      stepY,
      length,
      axis,
      margin,
      labelWidth,
      horizontalLines,
      colors
    } = this.state;
    const bars = this.props.chart.values[0].map((p, i) => {
      return (
        <View key={i} style={[styles.barBoxButton]}>
          <View style={[styles.barBoxContainer, this.styleContainer(i)]}>
            <View style={[styles.barBoxBottom]}>
              <Text style={[styles.barText]}>{axis[i]}</Text>
            </View>

            <View style={[styles.barBox, this.calcMin()]}>
              <View
                style={[
                  styles.bar,
                  styles.barPast,
                  this.calcHeight(this.props.chart.values[4][i])
                ]}
              >
                <Text
                  style={[styles.barText, { fontSize: 18, color: 'black' }]}
                >
                  {this.props.chart.values[4][i] != '0'
                    ? Number(this.props.chart.values[4][i].toFixed(1))
                    : ''}
                </Text>
              </View>
              <View
                style={[
                  styles.bar,
                  styles.barReal,
                  this.calcHeight(this.props.chart.values[3][i])
                ]}
              >
                <Text
                  style={[styles.barText, { fontSize: 18, color: 'black' }]}
                >
                  {this.props.chart.values[3][i] != '0'
                    ? Number(this.props.chart.values[3][i].toFixed(1))
                    : ''}
                </Text>
              </View>

              <View
                style={[
                  styles.bar,
                  styles.barFuture,
                  this.calcHeight(this.props.chart.values[2][i])
                ]}
              >
                <Text
                  style={[styles.barText, { fontSize: 18, color: 'black' }]}
                >
                  {this.props.chart.values[2][i] != '0'
                    ? Number(this.props.chart.values[2][i].toFixed(1))
                    : ''}
                </Text>
              </View>
              <View
                style={[
                  styles.bar,
                  styles.barGreen,
                  this.calcHeight(this.props.chart.values[1][i])
                ]}
              >
                <Text
                  style={[styles.barText, { fontSize: 18, color: 'black' }]}
                >
                  {this.props.chart.values[1][i] != '0'
                    ? Number(this.props.chart.values[1][i].toFixed(1))
                    : ''}
                </Text>
              </View>
              <View
                style={[
                  styles.bar,
                  styles.bardarkGreen,
                  this.calcHeight(this.props.chart.values[0][i])
                ]}
              >
                <Text
                  style={[styles.barText, { fontSize: 18, color: 'black' }]}
                >
                  {this.props.chart.values[0][i] != '0'
                    ? Number(this.props.chart.values[0][i].toFixed(1))
                    : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    });

    const borderWidth = 2;
    return (
      <View style={[styles.container, this.setHeight()]}>
        <View style={[styles.chartItems]}>{bars}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    overflow: 'hidden'
  },
  chartItems: {
    display: 'flex',
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  barBoxButton: {
    display: 'flex',
    flex: 1
  },
  barBoxContainer: {
    display: 'flex',
    width: '90%',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    borderColor: 'lightgray',
    margin: 10,
    alignContent: 'center',
    borderRadius: 6,
    flex: 1
  },
  barBox: {
    display: 'flex',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1
  },
  barBoxBottom: {
    display: 'flex',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  barText: {
    display: 'flex',
    textAlign: 'center',
    marginTop: 4,
    fontSize: 16,
    marginBottom: 4,
    paddingTop: 2,
    paddingBottom: 2,
    color: 'grey',
    fontWeight: 'bold'
  },
  bar: {
    display: 'flex',
    flex: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginLeft: 2
  },
  barPast: {
    backgroundColor: colors.chartBlue
  },
  barReal: {
    backgroundColor: colors.chartRed
  },
  barFuture: {
    backgroundColor: colors.chartYellow
  },
  barGreen: {
    backgroundColor: colors.chartGreen
  },
  bardarkGreen: {
    backgroundColor: colors.chartDGreen
  }
});
