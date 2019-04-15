import React from 'react';
import { Text, View, Image } from 'react-native';

const Loader = () => (
  <View>
    <Image
      source={require('../../../assets/img/robot.gif')}
      style={{
        width: 300,
        height: 400,
        resizeMode: 'contain',
        alignContent: 'center'
      }}
    />
    <Text style={styles.textStyle}>ScorePedia</Text>
    <Text style={{ alignSelf: 'center', color: 'black' }}>Admin panel</Text>
  </View>
);

export { Loader };

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }
};
