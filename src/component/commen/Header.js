//creat header for all app

import React from 'react';
import { View, Text } from 'react-native';

const Header = Props => {
  const { textstyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textstyle}> {Props.headerText}</Text>
    </View>
  );
};

const styles = {
  textstyle: {
    fontSize: 20,
    color: '#ffffff'
  },
  viewStyle: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,172,193 ,1)',
    alignItems: 'center',
    shadowOffSet: { width: 0, height: 2 },
    shadowColor: '#95a5a6',
    shadowOppacity: 0.2,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20
  }
};

export { Header };
