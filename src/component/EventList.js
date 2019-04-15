import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  AsyncStorage,
  Image,
  Alert,
  TouchableOpacity,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SwitchSelector from 'react-native-switch-selector';
import { getListEvent } from '../actions';
import { ListSection, DateTimeInput, Header } from './commen';

const moment = require('moment');

class EventList extends Component {
  state = {
    modalVisibility: false,
    isDatePickerVisible: false,
    fromDate: '',
    fromTime: '',
    toDate: '',
    toTime: '',
    isTimePickerVisible: false,
    fromOrTo: '',
    itemFiltered: ''
  };
  componentDidMount() {
    this.props.getListEvent();
  }

  showModal(itemFilter) {
    let now, currentDate;
    if (
      itemFilter.itemFilter.status === '3' ||
      itemFilter.itemFilter.status === '2'
    ) {
      now = moment(itemFilter.itemFilter.endDate);
      currentDate = moment(itemFilter.itemFilter.endDate);
    } else {
      now = moment();
      currentDate = moment();
    }

    currentDate.add(-1, 'h');
    console.log(itemFilter);
    this.setState({
      modalVisibility: !this.state.modalVisibility,
      itemFiltered: itemFilter,
      toDate: now.year() + '/' + (now.month() + 1) + '/' + now.date(),
      toTime: now.hour() + ':' + now.minute(),
      fromDate:
        currentDate.year() +
        '/' +
        (currentDate.month() + 1) +
        '/' +
        currentDate.date(),
      fromTime: currentDate.hour() + ':' + currentDate.minute()
    });
  }
  handleDatePicked = date => {
    const startDate = new Date(this.state.itemFiltered.itemFilter.startDate);
    const endDate = new Date(this.state.itemFiltered.itemFilter.endDate);
    console.log('A date has been picked: ', date);
    if (this.state.fromOrTo === 'from') {
      if (
        startDate.getTime() <= date.getTime() &&
        date.getTime() <= endDate.getTime()
      ) {
        if (this.state.isDatePickerVisible) {
          const mounth = date.getMonth() + 1;

          this.setState({
            isDatePickerVisible: !this.state.isDatePickerVisible,
            // isTimePickerVisible: true,
            fromDate: date.getFullYear() + '/' + mounth + '/' + date.getDate()
          });
        }
        if (!this.state.isDatePickerVisible) {
          this.setState({
            isTimePickerVisible: !this.state.isTimePickerVisible,
            fromTime: date.getHours() + ':' + date.getMinutes()
          });
        }
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
        if (this.state.isDatePickerVisible) {
          const mounth = date.getMonth() + 1;
          this.setState({
            isDatePickerVisible: !this.state.isDatePickerVisible,
            // isTimePickerVisible: true,
            toDate: date.getFullYear() + '/' + mounth + '/' + date.getDate()
          });
        }
        if (!this.state.isDatePickerVisible) {
          this.setState({
            isTimePickerVisible: !this.state.isTimePickerVisible,
            toTime: date.getHours() + ':' + date.getMinutes()
          });
        }
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
  onOkPress({ id }) {
    AsyncStorage.multiSet(
      [
        ['eventId', id.toString()],
        ['start', this.state.fromDate + 'T' + this.state.fromTime],
        ['end', this.state.toDate + 'T' + this.state.toTime]
      ],
      data => {
        if (data) {
          //alert('Something went wrong!');
          console.log('multi faield');
        } else {
          // do something if the set was successful
          console.log('multi successful');
          Actions.chart();
        }
      }
    );
  }
  onCancelPress() {
    this.setState({ modalVisibility: false });
  }
  onSwitcherPress(value) {
    let currentDate, now;

    if (
      this.state.itemFiltered.itemFilter.status === '3' ||
      this.state.itemFiltered.itemFilter.status === '2'
    ) {
      now = moment(this.state.itemFiltered.itemFilter.endDate);
      currentDate = moment(this.state.itemFiltered.itemFilter.endDate);
    } else {
      now = moment();
      currentDate = moment();
    }
    const currentM = currentDate.month() + 1;
    const nowtM = now.month() + 1;
    this.setState({ gender: value });
    switch (value) {
      case '1':
        currentDate.add(-1, 'year');
        this.setState({
          gender: value,
          toDate: now.year() + '/' + nowtM + '/' + now.date(),
          toTime: now.hour() + ':' + now.minute(),
          fromDate:
            currentDate.year() + '/' + currentM + '/' + currentDate.date(),
          fromTime: currentDate.hour() + ':' + currentDate.minute()
        });
        break;
      case '2':
        currentDate.add(-5, 'h');
        this.setState({
          gender: value,
          toDate: now.year() + '/' + nowtM + '/' + now.date(),
          toTime: now.hour() + ':' + now.minute(),
          fromDate:
            currentDate.year() + '/' + currentM + '/' + currentDate.date(),
          fromTime: currentDate.hour() + ':' + currentDate.minute()
        });
        break;
      case '3':
        currentDate.add(-1, 'd');
        this.setState({
          gender: value,
          toDate: now.year() + '/' + nowtM + '/' + now.date(),
          toTime: now.hour() + ':' + now.minute(),
          fromDate:
            currentDate.year() + '/' + currentM + '/' + currentDate.date(),
          fromTime: currentDate.hour() + ':' + currentDate.minute()
        });
        break;
      case '4':
        currentDate.add(-7, 'd');
        this.setState({
          gender: value,
          toDate: now.year() + '/' + nowtM + '/' + now.date(),
          toTime: now.hour() + ':' + now.minute(),
          fromDate:
            currentDate.year() +
            '/' +
            (currentDate.month() + 1) +
            '/' +
            currentDate.date(),
          fromTime: currentDate.hour() + ':' + currentDate.minute()
        });
        break;
      case '5':
        currentDate.add(-1, 'months');
        this.setState({
          gender: value,
          toDate: now.year() + '/' + nowtM + '/' + now.date(),
          toTime: now.hour() + ':' + now.minute(),
          fromDate:
            currentDate.year() +
            '/' +
            (currentDate.month() + 1) +
            '/' +
            currentDate.date(),
          fromTime: currentDate.hour() + ':' + currentDate.minute()
        });
        break;
      case '6':
        const startDate = moment(this.state.itemFiltered.itemFilter.startDate);
        const endDate = new Date(this.state.itemFiltered.itemFilter.endDate);
        this.setState({
          gender: value,
          toDate:
            endDate.getFullYear() +
            '/' +
            (endDate.getMonth() + 1) +
            '/' +
            endDate.getDate(),
          toTime: endDate.getHours() + ':' + endDate.getMinutes(),
          fromDate:
            startDate.year() +
            '/' +
            (startDate.month() + 1) +
            '/' +
            startDate.date(),
          fromTime: startDate.hour() + ':' + startDate.minutes()
        });
        break;
      case '5':
        currentDate.add(-3, 'months');
        this.setState({
          gender: value,
          toDate: now.year() + '/' + nowtM + '/' + now.date(),
          toTime: now.hour() + ':' + now.minute(),
          fromDate:
            currentDate.year() +
            '/' +
            (currentDate.month() + 1) +
            '/' +
            currentDate.date(),
          fromTime: currentDate.hour() + ':' + currentDate.minute()
        });
        break;
      default:
        currentDate.add(-1, 'h');
        this.setState({
          gender: value,
          toDate: now.year() + '/' + nowtM + '/' + now.date(),
          toTime: now.hour() + ':' + now.minute(),
          fromDate:
            currentDate.year() + '/' + currentM + '/' + currentDate.date(),
          fromTime: currentDate.hour() + ':' + currentDate.minute()
        });

        break;
    }
  }
  onItemPress = ({ eventId }) => {
    AsyncStorage.setItem('eventId', JSON.stringify(eventId));
    Actions.chart();
  };
  renderingUi() {
    console.log(this.props);

    if (this.props.eventList.length !== 0) {
      return (
        <View>
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
                btnText={this.state.fromDate + '    ' + this.state.fromTime}
                onPress={this.onButtonPress.bind(this)}
                lable={'From:'}
              />
              <DateTimeInput
                btnText={this.state.toDate + '    ' + this.state.toTime}
                onPress={this.onButtonToTimePress.bind(this)}
                lable={'To:'}
              />
              <DateTimePicker
                isVisible={this.state.isDatePickerVisible}
                onConfirm={this.handleDatePicked.bind(this)}
                onCancel={() => this.setState({ isDatePickerVisible: false })}
                mode={'date'}
              />
              <DateTimePicker
                isVisible={this.state.isTimePickerVisible}
                onConfirm={this.handleDatePicked.bind(this)}
                onCancel={() => this.setState({ isTimePickerVisible: false })}
                mode={'time'}
              />
              {/* <SwitchSelector
                style={{ margin: 5 }}
                initial={0}
                onPress={value => this.onSwitcherPress(value)}
                textColor={'#00ACC1'} //'#7a44cf'
                selectedColor={'white'}
                buttonColor={'lightgrey'}
                borderColor={'#00ACC1'}
                hasPadding
                options={[
                  {
                    label: '5H',
                    value: '2'
                  },
                  {
                    label: '1D',
                    value: '3'
                  },
                  {
                    label: '1W',
                    value: '4'
                  },
                  {
                    label: '1M',
                    value: '5'
                  },
                  {
                    label: '3M',
                    value: '7'
                    // imageIcon: require('../../assets/img/exit.png')
                  },
                  {
                    label: '1Y',
                    value: '1'
                    // imageIcon: require('../../assets/img/exit.png')
                  },
                  {
                    label: 'All',
                    value: '6'
                  }
                ]}
              /> */}
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
                      id: this.state.itemFiltered.itemFilter.id
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
          <FlatList
            data={this.props.eventList}
            keyExtractor={(item, index) => JSON.stringify(item.id)}
            renderItem={({ item }) => (
              <ListSection
                status={item.status}
                date={item.locationName}
                title={item.name}
                id={item.id}
                onFilterpress={() => this.showModal({ itemFilter: item })}
                onPress={() => this.onItemPress({ eventId: item.id })}
                display={'flex'}
              />
            )}
          />
        </View>
      );
    }
    // return (
    //   <ActivityIndicator style={styles.indicator} animating size="large" />
    // );

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
          you dont define any event.
        </Text>
      </View>
    );
  }

  render() {
    return <View style={{ flex: 1 }}>{this.renderingUi()}</View>;
  }
}
const mapStateToProps = state => ({
  eventList: state.eventReducer.data
});
export default connect(
  mapStateToProps,
  { getListEvent }
)(EventList);
const styles = {
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    color: '#00b894'
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
