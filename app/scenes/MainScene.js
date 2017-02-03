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
} from 'react-native';

import Logo from '../components/Logo';

export default class MainScene extends Component {
  constructor() {
    super();
  }
  static get defaultProps() { 
    return { title: 'MainScene', navigator: null };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo style={styles.logoImage} />
        </View>

        <Text style={styles.welcome}>
          Welcome to CrossOver Ticket System!
        </Text>

        <Text style={styles.instructions}>
          To get started, sign in in the application, or create an account pressing sign up button.
        </Text>

        <Button onPress={this.onSignin.bind(this)} 
          title="Sign in"
          accessibilityLabel="Sign in into ticket system" />
        <Button 
          color="lightgreen"
          onPress={this.onSignup.bind(this)} 
          title="Sign up" accessibilityLabel="Sign up into ticket system" />
      </View>
    );
  }

  onSignin() {
    this.props.navigator.push({ screen: 'SigninScene' });
  }
  onSignup() {
    this.props.navigator.push({ screen: 'SignupScene' });
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
  signIn: {
    flex: 1,
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
