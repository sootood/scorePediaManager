//creat header for all app

import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  AsyncStorage,
  Image
} from 'react-native';

export const ListSection = Props => {
  return (
    <View
      style={[
        styles.mainView,
        Props.status === '1' ? styles.backgroundStyleB : styles.backgroundStyleW
      ]}
    >
      <TouchableWithoutFeedback onPress={Props.onPress}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{
                height: 30,
                width: 30,
                alignSelf: 'center',
                margin: 10
              }}
              source={require('../../../assets/img/survey.png')}
            />
            <View>
              <Text style={styles.titleStyle}>{Props.title}</Text>
              <Text style={styles.subtitleStyle}>{Props.date}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={Props.onFilterpress !== null ? Props.onFilterpress : null}
      >
        <Image
          style={{
            height: 30,
            width: 30,
            alignSelf: 'center',
            margin: 10,
            position: 'absolute',
            right: 0,
            display: Props.display
          }}
          source={require('../../../assets/img/filter.png')}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = {
  titleStyle: {
    color: 'black',
    fontSize: 20
  },
  subtitleStyle: {
    color: 'grey',
    fontSize: 15
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
    fontSize: 10
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

// export { ListSection };
