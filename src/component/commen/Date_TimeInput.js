import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const DateTimeInput = ({ lable, onPress, btnText }) => {
  const { viewStyle, touchableStyle, textStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{lable}</Text>
      <TouchableOpacity onPress={onPress} style={touchableStyle}>
        <Text style={{ color: 'darkgrey' }}> {btnText} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: 'center'
  },
  textStyle: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
  touchableStyle: {
    flex: 3,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 20,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    borderColor: 'grey',
    alignSelf: 'center'
  }
};

export { DateTimeInput };
