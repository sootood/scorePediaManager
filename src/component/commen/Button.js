import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ btnText, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.touchableStyle}>
    <Text style={{ color: 'white' }}> {btnText} </Text>
  </TouchableOpacity>
);
const styles = {
  touchableStyle: {
    padding: 10,
    margin: 10,
    width: 150,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 20,
    backgroundColor: 'rgba(0,172,193 ,1)',
    borderRadius: 5,
    alignSelf: 'center'
  }
};

export { Button };
