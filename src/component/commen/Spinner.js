import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
  const { viewStyle } = styles;
  console.log('snipper render');
  return (
    <View style={viewStyle}>
      <ActivityIndicator size={size || 'Large'} />
    </View>
  );
};
const styles = {
  viewStyle: {
    justifyContent: 'center'
  }
};
export { Spinner };
