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
  TextInput
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Logo from '../components/Logo';
import { Popup } from '../components/Popup';
import { SignupMutation } from '../constants/Queries';

export default class SignupScene extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    }
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
          onChangeText={(text) => this.setState({name: text})} value={this.state.name}
          />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter your email'
          onChangeText={(text) => this.setState({email: text})} value={this.state.email}
          />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter a password'
          onChangeText={(text) => this.setState({password: text})} value={this.state.password}
          secureTextEntry={true}
          />
        <Button 
          color="lightgreen"
          onPress={this.onSignup.bind(this)} 
          title="Sign up" accessibilityLabel="Sign up into ticket system" />
      </View>
    );
  }

  onSignup() {
    this.props.mutate({
      variables: { input: {
        name: this.state.name,
        email: this.state.email, 
        password: this.state.password,
        password_confirmation: this.state.password }
    }}).then(({ data }) => {
      this.props.navigator.push({ screen: 'MainScene' });
      console.log('got data', data);
    }).catch((error) => {
      Popup.show("Signup failed!");
      console.log('there was an error sending the query', error);
    });
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

export const SignupSceneWithData = graphql(SignupMutation)(SignupScene);
