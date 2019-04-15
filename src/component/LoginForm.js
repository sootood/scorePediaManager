import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Card, CardSection, Button, Input } from './commen';
import { emailChange, passwordChange, userLogin } from '../actions';

const widthPhone = Dimensions.get('window').width;
const heightPhone = Dimensions.get('window').height;
class LoginForm extends Component {
  componentDidMount() {
    console.log(widthPhone);
    console.log(heightPhone);
  }
  onEmailchange(text) {
    this.props.emailChange(text);
  }

  onPasswordchange(text) {
    this.props.passwordChange(text);
  }
  onButtonPress() {
    const { email, password } = this.props;
    this.props.userLogin({ email, pasword: password });
  }

  renderbutton() {
    return <Button btnText={'Login'} onPress={this.onButtonPress.bind(this)} />;
  }
  renderingError() {
    if (this.props.error !== '') {
      return (
        <View style={{ alignContent: 'center', marginTop: 10 }}>
          <Text style={{ color: 'red', alignSelf: 'center', marginTop: 10 }}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }
  render() {
    return (
      <LinearGradient
        colors={['#0BDEFB', '#01E0FF', '#007D8E', '#00616F']}
        style={{ flex: 1, alignItems: 'center', alignContent: 'center' }}
      >
        <View
          style={{
            width: '100%',
            alignContent: 'center',
            alignSelf: 'center'
          }}
        >
          <Card>
            <Image
              style={{
                height: 80,
                width: '50%',
                alignSelf: 'center',
                margin: 10
              }}
              source={require('../../assets/img/logo.png')}
            />
            <CardSection style={{ marginBottom: 5 }}>
              <Input
                lable={'Username'}
                placeholder={'user'}
                onChangeText={this.onEmailchange.bind(this)}
                value={this.props.email}
              />
            </CardSection>
            <CardSection>
              <Input
                lable={'Password'}
                placeholder={'password'}
                secureTextEntry
                onChangeText={this.onPasswordchange.bind(this)}
                value={this.props.password}
              />
            </CardSection>
            {this.renderingError()}
            <Button btnText={'Login'} onPress={this.onButtonPress.bind(this)} />
          </Card>
        </View>
      </LinearGradient>
    );
  }
}
const mapStatetoProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  error: state.auth.error
});
export default connect(
  mapStatetoProps,
  { emailChange, passwordChange, userLogin }
)(LoginForm);
