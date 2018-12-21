import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
// import { ThemeProvider } from 'react-native-elements';
import { AsyncStorage } from "react-native"
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Input, Button, Spinner } from './common';
// import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as COLOR from './common/Colors';
import * as CON from './Cons'

var width = Dimensions.get('window').width; //full width

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      'username': 'user1',
      'password': '123123asd',
      'loading': false,
      'error': '',
    };
  }
  onUsernameChange(text) {
    this.setState({'username': text});
  }
  onPasswordChange(text) {
    this.setState({'password': text});
  }
  onButtonPress() {
    this.setState({'loading': true, 'error': ''});
    if (this.state.username !== '' && this.state.password !== '') {
      axios.post(CON.URL + CON.LOGIN, 
          {
            'username': this.state.username,
            'password': this.state.password
          })
        .then(response => {
          this.setState({'error': '', 'loading': false});
          AsyncStorage.setItem('username', this.state.username);
          AsyncStorage.setItem('password', this.state.password);
          AsyncStorage.setItem('user', response.data['user'].toString());
          console.log('User is successfuly logged in');
          Actions.main();
        })
        .catch(error => {
          console.log('Error: ', error);
          this.setState({'error': 'Could not log in', 'loading': false});
        })
    } else {
      this.setState({'error': 'Please enter username and password', 'loading': false});
    }
  }
  renderButton() {
    if (this.state.loading){
      return <Spinner size='large' />;
    }
    else {
    return (
    <Button onPress={this.onButtonPress.bind(this)}>
      Log in
    </Button>
    );
    }
  }
  renderError() {
    if (this.state.error) {
      return(
        <CardSection>
          <Text style={styles.errorStyle}>{this.state.error}</Text>
        </CardSection>
      );
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' enabled>
        <View style={styles.viewLogoStyle}>
          <Image 
            style={styles.logoStyle}
            source={require('../static/logo.png')} 
            />
          {/* <Text style={styles.logoStyle}>YAHOMAS</Text> */}
        </View>
        <Card>
          <CardSection>
            <Text style={styles.labelStyle}>
              This is a mock-up app for the project Yahomas
            </Text>
          </CardSection>
          <CardSection style={styles.inputStyle}>
            <Input
              placeholder='Username'
              onChangeText={this.onUsernameChange.bind(this)}
              value={this.state.username}
            />
          </CardSection>
          <CardSection style={styles.inputStyle}>
            <Input
              placeholder='Password'
              secureTextEntry
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.state.password}
            />
          </CardSection>
          {this.renderError()}
          <CardSection style={styles.inputStyle}>
            {this.renderButton()}
          </CardSection>
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  viewLogoStyle: {
    width: width,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    padding: 20,
  },
  logoStyle: {
    width: 200,
    height: 79,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 10,
    color: COLOR.TEXT_DARK,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  inputStyle: {
    marginHorizontal: 20,
  },
  errorStyle: {
    fontSize: 18,
    paddingLeft: 10,
    color: COLOR.ERROR,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
})


export default LoginForm;
