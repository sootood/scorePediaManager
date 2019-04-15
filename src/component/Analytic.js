import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  AsyncStorage,
  FlatList,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform
} from 'react-native';
import {
  BarChart,
  Grid,
  XAxis,
  LineChart,
  YAxis
} from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import SwitchSelector from 'react-native-switch-selector';
import { Text as SvgText } from 'react-native-svg';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MKProgress } from 'react-native-material-kit';
import Toast from 'react-native-root-toast';
import Orientation from 'react-native-orientation';
import { DateTimeInput, Header } from './commen';
import { reportEvent, accessUpdateReport, runProgressbar } from '../actions';

const moment = require('moment');
let widthPhone = Dimensions.get('window').width;
const heightPhone = Dimensions.get('window').height;
const axesSvg = { fontWeight: 'bold', fontSize: 10, fill: '#424242' };
const style = {
  backgroundColor: '#262321',
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

class Analytic extends Component {
  state = {
    eventId: '',
    mainStartDate: '',
    mainEndDate: '',
    startEvent: '',
    endEvent: '',
    typeFilter: '',
    status: '',
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    modalVisibility: false,
    fromOrTo: '',
    updateAccess: true,
    progressOp: 0,
    switcherValue: '',
    orientation: Orientation.getInitialOrientation()
  };

  componentDidMount() {
    console.log(this.state.eventId);
    this.loadId();
    console.log(widthPhone);
    console.log(heightPhone);
    Dimensions.addEventListener('change', () => {
      console.log('change ori');
      const dim = Dimensions.get('screen');
      console.log(dim);
      console.log(dim.width >= widthPhone);

      if (dim.width >= widthPhone) {
        widthPhone = heightPhone;
        this.setState({
          orientation: 'LANDSCAPE'
        });
      } else {
        widthPhone = Dimensions.get('window').width;
        this.setState({
          orientation: 'PORTRAIT'
        });
      }
    });
  }

  componentDidUpdate() {
    console.log('update');
    console.log(this.state);
    console.log(this.props);

    if (this.state.updateAccess && this.props.succedFetch) {
      console.log(this.state.updateAccess && this.props.succedFetch);
      this.props.reportEvent({
        idChart: this.state.eventId,
        typeDuration: this.state.typeFilter,
        startDate: this.state.startEvent.replace(new RegExp('/', 'g'), '-'),
        endDate: this.state.endEvent.replace(new RegExp('/', 'g'), '-')
      });
      this.props.runProgressbar();
    }
  }

  onButtonPress() {
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
      fromOrTo: 'from'
    });
  }
  onButtonToTimePress() {
    this.setState({
      isDatePickerVisible: !this.state.isDatePickerVisible,
      fromOrTo: 'to'
    });
  }
  onSwitcherPeriodPress(value) {
    console.log(value);
    switch (value) {
      case '1':
        this.setState({ typeFilter: '1', updateAccess: false });
        break;
      case '2':
        this.setState({ typeFilter: '2', updateAccess: false });

        break;
      case '3':
        this.setState({ typeFilter: '3', updateAccess: false });

        break;
      case '4':
        this.setState({ typeFilter: '4', updateAccess: false });

        break;

      default:
        this.setState({ typeFilter: '1', updateAccess: false });

        break;
    }
  }

  onSwitcherPress(value) {
    let currentDate, now;
    this.props.accessUpdateReport();
    if (this.state.status === '3' || this.state.status === '2') {
      now = moment(this.state.mainEndDate);
      currentDate = moment(this.state.mainEndDate);
    } else {
      now = moment();
      currentDate = moment();
    }
    const currentM = currentDate.month() + 1;
    const nowtM = now.month() + 1;
    switch (value) {
      case '7d':
        currentDate.add(-7, 'd');
        this.setState({
          typeFilter: 1,
          endEvent: now.year() + '/' + nowtM + '/' + now.date(),
          startEvent:
            currentDate.year() +
            '/' +
            (currentDate.month() + 1) +
            '/' +
            currentDate.date(),
          updateAccess: true,
          switcherValue: '7d'
        });
        break;
      case '1m':
        currentDate.add(-30, 'd');
        this.setState({
          typeFilter: 1,
          endEvent: now.year() + '/' + nowtM + '/' + now.date(),
          startEvent:
            currentDate.year() +
            '/' +
            (currentDate.month() + 1) +
            '/' +
            currentDate.date(),
          updateAccess: true,
          switcherValue: ''
        });
        break;
      case '6m':
        currentDate.add(-(6 * 30), 'd');
        this.setState({
          typeFilter: 2,
          endEvent: now.year() + '/' + nowtM + '/' + now.date(),
          startEvent:
            currentDate.year() +
            '/' +
            (currentDate.month() + 1) +
            '/' +
            currentDate.date(),
          updateAccess: true,
          switcherValue: ''
        });
        break;
      case '1y':
        currentDate.add(-1, 'year');
        this.setState({
          typeFilter: 3,
          endEvent: now.year() + '/' + nowtM + '/' + now.date(),
          startEvent:
            currentDate.year() +
            '/' +
            (currentDate.month() + 1) +
            '/' +
            currentDate.date(),
          updateAccess: true,
          switcherValue: ''
        });
        break;

      default:
        currentDate.add(-7, 'd');
        this.setState({
          typeFilter: 1,
          ende: now.year() + '/' + nowtM + '/' + now.date(),
          startEvent:
            currentDate.year() +
            '/' +
            (currentDate.month() + 1) +
            '/' +
            currentDate.date(),
          updateAccess: true,
          switcherValue: ''
        });

        break;
    }
  }
  onFilterClick() {
    console.log('on filter click');
    this.setState({ modalVisibility: true, updateAccess: false });
  }
  handleDatePicked = date => {
    const startDate = new Date(this.state.mainStartDate);
    const endDate = new Date(this.state.mainEndDate);
    console.log('A date has been picked: ', date);
    if (this.state.fromOrTo === 'from') {
      if (
        startDate.getTime() <= date.getTime() &&
        date.getTime() <= endDate.getTime()
      ) {
        const mounth = date.getMonth() + 1;

        this.setState({
          isDatePickerVisible: !this.state.isDatePickerVisible,
          // isTimePickerVisible: true,
          startEvent: date.getFullYear() + '/' + mounth + '/' + date.getDate()
        });
      } else {
        Alert.alert(
          'Warning',
          'please choose Time between running time event',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: true }
        );
      }
    } else if (this.state.fromOrTo === 'to') {
      if (
        startDate.getTime() <= date.getTime() &&
        date.getTime() <= endDate.getTime()
      ) {
        const mounth = date.getMonth() + 1;
        this.setState({
          isDatePickerVisible: !this.state.isDatePickerVisible,
          // isTimePickerVisible: true,
          endEvent: date.getFullYear() + '/' + mounth + '/' + date.getDate()
        });
      } else {
        Alert.alert(
          'Warning',
          'please choose Time between running time event',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: true }
        );
      }
    }
  };
  onOkPress({ id }) {
    this.props.accessUpdateReport();
    this.setState({ modalVisibility: false, updateAccess: true });
  }
  onCancelPress() {
    this.setState({ modalVisibility: false, updateAccess: true });
  }
  async loadId() {
    try {
      await Promise.all([
        AsyncStorage.getItem('eventId'),
        AsyncStorage.getItem('startDate'),
        AsyncStorage.getItem('endDate'),
        AsyncStorage.getItem('status')
      ]).then(data => {
        if (data[0] != null) {
          console.log(data);
          // this.props.reportEvent({
          //   idChart: data[0],
          //   typeDuration: 2,
          //   startDate: data[1],
          //   endDate: data[2]
          // });

          const date1 = moment(data[1]);
          const date2 = moment(data[2]);
          this.setState({
            eventId: data[0],
            startEvent:
              date1.year() + '/' + (date1.month() + 1) + '/' + date1.date(),
            mainStartDate:
              date1.year() + '/' + (date1.month() + 1) + '/' + date1.date(),
            endEvent:
              date2.year() + '/' + (date2.month() + 1) + '/' + date2.date(),
            mainEndDate:
              date2.year() + '/' + (date2.month() + 1) + '/' + date2.date(),
            status: data[3],
            updateAccess: false
          });
          this.onSwitcherPress('7d');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  renderingLablebaseOnFilter(item, detailsInfo, size) {
    let dayNumber = null;
    if (this.state.switcherValue === '7d') {
      if (detailsInfo.slice(-2).startsWith('0')) {
        dayNumber = detailsInfo.slice(-1);
      } else {
        dayNumber = detailsInfo.slice(-2);
      }
    } else {
      if (detailsInfo.slice(-2).startsWith('0')) {
        if (detailsInfo.slice(-2) % 2 == 0) {
          dayNumber = detailsInfo.slice(-1);
        } else {
          dayNumber = '';
        }
      } else {
        if (detailsInfo.slice(-2) % 2 == 0) {
          dayNumber = detailsInfo.slice(-2);
        } else {
          dayNumber = '';
        }
      }
    }

    if (this.state.typeFilter == 2) {
      return (
        <Text
          style={{
            fontSize: 9,
            color: '#424242',
            marginLeft: 25,
            width: (widthPhone * 0.88) / size
          }}
        >
          {item}
        </Text>
      );
    } else if (this.state.typeFilter == 3) {
      return (
        <Text
          style={{
            fontSize: 9,
            color: '#424242',
            width: (widthPhone * 0.88) / size
          }}
        >
          {detailsInfo}
        </Text>
      );
    }

    return (
      <Text
        style={{
          fontSize: 9,
          justifyContent: 'center',
          alignSelf: 'center',
          color: '#424242',
          width: (widthPhone * 0.88) / size
        }}
      >
        {dayNumber}
      </Text>
    );
  }

  renderingLable(item, index, detailsInfo, size) {
    return (
      <View>
        <TouchableOpacity
          style={{
            width: (widthPhone * 0.88) / size,
            backgroundColor: 'transparent'
          }}
          onPress={() => this.showToast(item + '/' + detailsInfo)}
        >
          {this.renderingLablebaseOnFilter(item, detailsInfo, size)}
        </TouchableOpacity>
      </View>
    );
  }

  showToast(text) {
    Toast.show(text, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0
    });
  }

  renderingChart(item, index) {
    console.log(this.props);
    const arrayDetail = item.details;
    const arrayChart = [];
    const arrayname = [];
    const labelDetails = [];

    const fill = '#00ACC1';
    const CUT_OFF = 5;

    // const names = item.datepart;
    // const charDatas = item.datepartAverage;

    // arrayChart = charDatas.split(',').map(Number);
    // arrayname = names.split(',');
    if (arrayDetail.length > 0) {
      for (let i = 0; i < arrayDetail.length; i++) {
        arrayChart.push(arrayDetail[i].datepartAverage);
        if (this.state.typeFilter == 2) {
          if (!arrayname.includes(arrayDetail[i].dateGroup)) {
            arrayname.push(arrayDetail[i].dateGroup);
          }
        } else {
          arrayname.push(arrayDetail[i].dateGroup);
        }
        labelDetails.push(arrayDetail[i].date);
      }
      const Labels = ({ x, y, bandwidth, data }) =>
        data.map((value, index) => (
          <SvgText
            key={index}
            x={x(index) + bandwidth / 2}
            y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
            fontSize={10}
            fill={value >= CUT_OFF ? 'white' : 'black'}
            alignmentBaseline={'middle'}
            textAnchor={'middle'}
            style={{ transform: [{ rotate: '90deg' }] }}
          >
            {value}
          </SvgText>
        ));
      console.log(arrayChart);
      console.log(arrayname);
      console.log(labelDetails);

      return (
        <View style={styles.cardContainer}>
          <View
            style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}
          >
            <Text style={styles.titleStyle}>
              {index + 1}.{item.FLD_TEXT}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <YAxis
              data={arrayChart}
              style={{ marginBottom: -10, height: 198, width: 15 }}
              contentInset={{ top: 10, bottom: 5 }}
              svg={axesSvg}
              yAccessor={({ index }) => arrayChart[index]}
              formatLabel={value => value}
              numberOfTicks={5}
              // scale={scale.scale}
            />

            <LineChart
              style={{ height: 200, width: '96%', right: 2, left: 2 }}
              data={arrayChart}
              contentInset={{ top: 30, bottom: 10 }}
              svg={{ stroke: 'orange' }}
            >
              {/* <Grid /> */}
              {/* <Labels /> */}
            </LineChart>
          </View>
          {/* <XAxis
            data={arrayname}
            formatLabel={index => arrayname[index].slice(-2)}
            contentInset={{
              left: 20,
              right: 30
            }}
            svg={{ fontSize: 10, fill: 'grey' }}
            spacingInner={0.8}
            style={{
              marginTop: 2,
              width: '100%'
            }}
          /> */}
          <FlatList
            data={arrayname}
            style={{
              width: '100%',
              height: 40,
              flexDirection: 'row',
              right: 0,
              backgroundColor: 'transparent',
              marginLeft: this.state.orientation === 'PORTRAIT' ? 15 : 35
            }}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) =>
              this.renderingLable(
                item,
                index,
                labelDetails[index],
                arrayname.length
              )
            }
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>fetching data has problem</Text>
        </View>
      );
    }
  }

  render() {
    console.log(this.props);

    return (
      <View style={{ paddingTop: 0 }}>
        <Modal
          visible={this.state.modalVisibility}
          transparent={false}
          backdropOpacity={0}
          animationType={'fade'}
          onRequestClose={() => this.showModal()}
          transparent
        >
          <View
            style={{
              marginTop: 100,
              margin: 50,
              elevation: 10,
              backgroundColor: 'white',
              height: 250,
              borderRadius: 20,
              paddingBottom: 40
            }}
          >
            <Header
              style={{ borderRadius: 20 }}
              headerText={'please choose duration'}
            />
            <DateTimeInput
              btnText={this.state.startEvent}
              onPress={this.onButtonPress.bind(this)}
              lable={'From:'}
            />
            <DateTimeInput
              btnText={this.state.endEvent}
              onPress={this.onButtonToTimePress.bind(this)}
              lable={'To:'}
            />
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.handleDatePicked.bind(this)}
              onCancel={() => this.setState({ isDatePickerVisible: false })}
              mode={'date'}
            />

            <SwitchSelector
              style={{ margin: 5 }}
              initial={0}
              onPress={value => this.onSwitcherPeriodPress(value)}
              textColor={'#00ACC1'} //'#7a44cf'
              selectedColor={'#00ACC1'}
              buttonColor={'lightgrey'}
              borderColor={'#00ACC1'}
              hasPadding
              options={[
                {
                  label: 'daily',
                  value: '1'
                },
                {
                  label: 'weekly',
                  value: '2'
                },
                {
                  label: 'mounthly',
                  value: '3'
                },
                {
                  label: 'yearly',
                  value: '4'
                }
              ]}
            />
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                position: 'absolute',
                bottom: 0
              }}
            >
              <TouchableOpacity
                style={[
                  styles.btnDialogStyle,
                  { borderBottomStartRadius: 20, marginRight: 2 }
                ]}
                onPress={() =>
                  this.onOkPress({
                    id: this.state.eventId
                  })
                }
              >
                <Text style={styles.txtBtnStyle}>ok</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnDialogStyle, { borderBottomEndRadius: 20 }]}
                onPress={() => this.onCancelPress()}
              >
                <Text style={styles.txtBtnStyle}> cancel </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View>
          <MKProgress.Indeterminate
            style={{
              top: 0,
              backgroundColor: 'lightgrey',
              opacity: this.props.progress
            }}
            progressColor={'#00ACC1'}
          />
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 8 }}>
          <SwitchSelector
            style={{
              width: this.state.orientation === 'PORTRAIT' ? '73%' : '85%',
              marginLeft: 20,
              marginRight: 10
            }}
            initial={0}
            onPress={value => this.onSwitcherPress(value)}
            textColor={'#00ACC1'} //'#7a44cf'
            selectedColor={'#00ACC1'}
            buttonColor={'lightgrey'}
            borderColor={'#00ACC1'}
            hasPadding
            options={[
              {
                label: '7D',
                value: '7d'
              },
              {
                label: '1M',
                value: '1m'
              },
              {
                label: '6M',
                value: '6m'
              },
              {
                label: '1Y',
                value: '1y'
              }
            ]}
          />
          <Icon.Button
            borderRadius={10}
            name="filter"
            backgroundColor="rgba(0, 172, 193, 0.8)"
            style={{
              marginLeft: 10,
              alignContent: 'center',
              backgroundColor: 'transparent',
              borderColor: '#00ACC1'
            }}
            onPress={() => this.onFilterClick()}
          />
        </View>
        <FlatList
          data={this.props.reportData}
          style={{ marginBottom: 60 }}
          keyExtractor={(item, index) => JSON.stringify(item.FLD_TEXT)}
          renderItem={({ item, index }) => this.renderingChart(item, index)}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  reportData: state.reportReducer.data,
  succedFetch: state.reportReducer.totallySucced,
  progress: state.reportReducer.progressOp
});

export default connect(
  mapStateToProps,
  { reportEvent, accessUpdateReport, runProgressbar }
)(Analytic);

const styles = {
  cardContainer: {
    width: '96%',
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    alignContent: 'center',
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOffset: 0.5,
    shadowOpacity: 1,
    borderRadius: 0.5,
    borderColor: 'white'
  },
  titleStyle: {
    color: 'rgb(47, 54, 64)',
    alignContent: 'center',
    alignSelf: 'center',
    fontSize: 15
  },
  btnDialogStyle: {
    backgroundColor: 'rgba(0, 172, 193, 1)',
    alignItems: 'center',
    flex: 1,
    height: 40
  },
  txtBtnStyle: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    padding: 5
  }
};
