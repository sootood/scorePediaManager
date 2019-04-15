import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  TouchableOpacity,
  Modal,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SwitchSelector from 'react-native-switch-selector';
import { getListEvent } from '../actions';
import ListSection from './commen';

const moment = require('moment');

class ReportList extends Component {
  componentDidMount() {
    this.props.getListEvent();
  }
  onItemPress = ({ eventId, startDateEvent, endDateEvent, status }) => {
    AsyncStorage.multiSet(
      [
        ['eventId', JSON.stringify(eventId)],
        ['startDate', startDateEvent],
        ['endDate', endDateEvent],
        ['status', status]
      ],
      data => {
        if (data) {
          //alert('Something went wrong!');
          console.log('multi faield');
        } else {
          // do something if the set was successful
          console.log('multi successful');
          Actions.analytic();
        }
      }
    );
  };

  renderingUi() {
    console.log(this.props);

    if (this.props.eventList.length !== 0) {
      return (
        <View>
          <FlatList
            data={this.props.eventList}
            keyExtractor={(item, index) => JSON.stringify(item.id)}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.mainView,
                  item.status === '1'
                    ? styles.backgroundStyleB
                    : styles.backgroundStyleW
                ]}
              >
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.onItemPress({
                      eventId: item.id,
                      startDateEvent: item.startDate,
                      endDateEvent: item.endDate,
                      status: item.status
                    })
                  }
                >
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        style={{
                          height: 30,
                          width: 30,
                          alignSelf: 'center',
                          margin: 10
                        }}
                        source={require('../../assets/img/survey.png')}
                      />
                      <View
                        style={{
                          alignSelf: 'center'
                        }}
                      >
                        <Text style={styles.titleStyle}>{item.name}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          />
        </View>
      );
    }
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
    // return <View />;
  }
}

const mapStateToProps = state => ({
  eventList: state.eventReducer.data
});

export default connect(
  mapStateToProps,
  { getListEvent }
)(ReportList);

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
  },
  titleStyle: {
    justifyContent: 'center',
    color: 'black',
    fontSize: 20
  },
  subtitleStyle: {
    color: 'grey',
    fontSize: 15
  },
  mainView: {
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    borderRadius: 0.8,
    shadowColor: '#00ACC1',
    shadowOffset: {
      width: 0,
      height: 3,
      flex: 1
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    width: '95%'
  },
  backgroundStyleW: {
    backgroundColor: 'white'
  },
  backgroundStyleB: {
    backgroundColor: 'rgba(0,172,193 ,0.2)'
  }
};
