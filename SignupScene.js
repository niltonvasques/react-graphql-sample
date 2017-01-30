/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TextInput
} from 'react-native';

import Logo from './Logo';

export default class SignupScene extends Component {
  static get defaultProps() { 
    return { navigator: null };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo style={styles.logoImage} />
        </View>
        <Text style={styles.welcome}>
          Create a new account 
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter username'
          />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter your email'
          />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter a password'
          />
        <Button 
          color="lightgreen"
          onPress={this.onSignup.bind(this)} 
          title="Sign up" accessibilityLabel="Sign up into ticket system" />
      </View>
    );
  }

  onSignup() {
    this.props.navigator.push({ screen: 'RequestsScene' });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    justifyContent: 'center',
  },
  signUp: {
    color: 'steelblue',
    backgroundColor: '#F5FCFF',
    tintColor: '#F5FCFF',
  },
  logoImage: {
    textAlign: 'center',
    alignItems: 'center',
  },
});
