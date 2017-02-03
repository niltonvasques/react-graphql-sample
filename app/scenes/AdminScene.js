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

import { storage } from '../store/Storage';

import Logo from '../components/Logo';

export default class AdminScene extends Component {
  constructor() {
    super();
    this.state = {
      user: { customer: false, agent: false, admin: false }
    };
  }

  componentDidMount() {
    storage.getItem('user', (user) => this.setState({ user: JSON.parse(user)}));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo style={styles.logoImage} uri='http://kidinesia.com/img/kid//blog/penulis3.jpg' />
        </View>

        <Text style={styles.welcome}>
          Administrator panel 
        </Text>

        <Text style={styles.instructions}>
          Welcome {this.state.user.name}! 
        </Text>

        <View style={styles.buttons}>
          <Button onPress={this.onUsers.bind(this)} 
            title="Users"
            accessibilityLabel="Manage users" />
        </View>
        <View style={styles.buttons}>
          <Button 
            onPress={this.onRequests.bind(this)} 
            title="Requests" accessibilityLabel="Manage requests" />
        </View>
        <View style={styles.signOut}>
          <Button 
            color="red"
            onPress={this.onSignout.bind(this)} 
            title="Sign out" accessibilityLabel="Sign out" />
        </View>
      </View>
    );
  }

  // Callback
  onUsers() {
    this.props.navigator.push({ screen: 'UsersScene' });
  }

  onRequests() {
    this.props.navigator.push({ screen: 'RequestsScene' });
  }

  onSignout() {
    this.props.navigator.push({ screen: 'SigninScene' });
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
  logoImage: {
    textAlign: 'center',
    alignItems: 'center',
  },
  buttons: {
   marginTop: 2,
  },
  signOut: {
   marginTop: 10,
  },
});
