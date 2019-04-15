import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity
} from 'react-native';

const FilterChart = ({ onPiePress, onBarPress, onCountPress, onPrecPress }) => {
  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.secondViewStyle}>
        <Text style={styles.titleStyle}>type's chart</Text>
        <View style={styles.thirdViewStyle}>
          <TouchableOpacity style={styles.btnStyle} onPress={onBarPress}>
            <Image
              style={styles.imageStyle}
              source={require('../../../assets/img/bars-chart.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle} onPress={onPiePress}>
            <Image
              style={styles.imageStyle}
              source={require('../../../assets/img/pie-chart.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondViewStyle}>
        <Text style={styles.titleStyle}>type's info</Text>
        <View style={styles.thirdViewStyle}>
          <TouchableOpacity style={styles.btnStyle} onPress={onCountPress}>
            <Image
              style={styles.imageStyle}
              source={require('../../../assets/img/numbered.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle} onPress={onPrecPress}>
            <Image
              style={styles.imageStyle}
              source={require('../../../assets/img/rate.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export { FilterChart };

const styles = {
  imageStyle: {
    flex: 1,
    height: 30,
    alignSelf: 'center',
    margin: 10
  },
  mainViewStyle: {
    width: '95%',
    flexDirection: 'row',
    padding: 10,
    alignContent: 'center',
    alignSelf: 'center'
  },
  secondViewStyle: {
    padding: 5,
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginRight: 4,
    marginLeft: 4
  },
  thirdViewStyle: {
    flexDirection: 'row'
  },
  titleStyle: {
    fontSize: 18
  },
  btnStyle: { height: 50, width: '50%' }
};
