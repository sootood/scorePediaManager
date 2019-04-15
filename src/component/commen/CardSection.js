import React from 'react';
import { View } from 'react-native';

const CardSection = Props => {
  const { viewStyle } = styles;
  return <View style={viewStyle}>{Props.children}</View>;
};

const styles = {
  viewStyle: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(0,172,193 ,1)'
  }
};
export { CardSection };
