import React from 'react';
import { View, TextInput, Text } from 'react-native';

const Input = ({ lable, value, placeholder, onChangeText, secureTextEntry }) => {
  const { viewStyle, inputStyle, textStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{lable}</Text>
      <TextInput
      secureTextEntry={secureTextEntry}
        style={inputStyle}
        value={value}
        placeholder={placeholder}
        autoCorrect={false}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 50,
    padding: 10
  },
  textStyle: {
    fontSize: 18,
    flex: 1,
    paddingLeft: 20,
    color: 'black'
  },
  inputStyle: {
    flex: 2,
    height: 50,
    lineHeight: 23,
    color: 'grey'
  }
};

export { Input };
