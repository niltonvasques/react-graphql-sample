/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert
} from 'react-native';

class Logo extends Component {
  render() {
    let pic = {
      uri: 'http://www.secnet.me/images/secnet/social-icons/support.png'
    };
    return (
        <Image source={pic} style={{width: 200, height: 200}}/>
    );
  }
}
const onButtonPress = () => { Alert.alert('Button has been pressed!'); };

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

export default class TicketSystem extends Component {
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

        <Button onPress={onButtonPress} title="Sign in" accessibilityLabel="Sign in into ticket system" />
        <Button color="lightgreen" onPress={onButtonPress} title="Sign up" accessibilityLabel="Sign up into ticket system" />
      </View>
    );
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

AppRegistry.registerComponent('TicketSystem', () => TicketSystem);
