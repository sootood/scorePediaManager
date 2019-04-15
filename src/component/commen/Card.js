import React from 'react';
import { View } from 'react-native';

const Card = Props => {
  const { viewStyle } = styles;
  return <View style={viewStyle}>{Props.children}</View>;
};

const styles = {
  viewStyle: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 10,
    margin: 10,
    marginTop: 30,
    alignContent: 'center',
    backgroundColor: 'white'
  }
};
export { Card };
