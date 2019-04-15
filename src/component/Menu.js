import React from 'react';
import { AsyncStorage, View, Text, ScrollView, Image } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { Actions } from 'react-native-router-flux';

export default class Menu extends React.Component {
  onPressList() {
    Actions.eventList();
  }
  onLogoutPress() {
    AsyncStorage.setItem('token', '');
    Actions.login();
  }
  onReportClick() {
    Actions.reportList();
  }
  onPressRunning() {
    Actions.nowSurvey();
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topSection} />
          <Text style={styles.titleMenu}>Admin panel</Text>
          <Image
            style={{
              height: 70,
              width: '50%',
              alignSelf: 'center',
              margin: 10
            }}
            source={require('../../assets/img/logo.png')}
          />
          <View>
            <Text style={styles.sectionHeadingStyle}>Menu</Text>
            <View style={styles.navSectionStyle}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'center',
                  margin: 10
                }}
                source={require('../../assets/img/list.png')}
              />
              <Text
                style={styles.navItemStyle}
                onPress={() => this.onPressList()}
              >
                My Events
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'center',
                  margin: 10,
                  padding: 10
                }}
                source={require('../../assets/img/website.png')}
              />
              <Text
                style={styles.navItemStyle}
                onPress={() => this.onPressRunning()}
              >
                Running Event
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'center',
                  margin: 10,
                  padding: 10
                }}
                source={require('../../assets/img/report.png')}
              />
              <Text
                style={styles.navItemStyle}
                onPress={() => this.onReportClick()}
              >
                Report
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  alignSelf: 'center',
                  margin: 10,
                  padding: 10
                }}
                source={require('../../assets/img/exit.png')}
              />
              <Text
                style={styles.navItemStyle}
                onPress={() => this.onLogoutPress()}
              >
                Logout
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text style={{ color: 'white' }}>ScorePedia Co</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  topSection: {
    backgroundColor: 'white'
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: '#ecf0f1',
    marginBottom: 2,
    flexDirection: 'row'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0,172,193 ,1)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
  titleMenu: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
    color: '#0B1618',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    borderBottomColor: 'grey',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderWidth: 2,
    width: '100%'
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,172,193 ,1)'
  }
};
