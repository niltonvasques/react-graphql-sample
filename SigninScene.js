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
  TextInput,
  AsyncStorage
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Logo from './Logo';

export default class SigninScene extends Component {
  constructor() {
    super();
    this.state = {
      email: "test3@dev.com",
      password: "123456",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo style={styles.logoImage} />
        </View>
        <Text style={styles.welcome}>
          Login 
        </Text>
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
        <Button onPress={this.onSignin.bind(this)} 
          title="Sign in"
          accessibilityLabel="Sign in into ticket system" />
      </View>
    );
  }

  onSignin() {
    this.props.mutate({
      variables: { input: { email: this.state.email, password: this.state.password } }
    }).then(({ data }) => {
      console.log('got data', data);
      try {
        AsyncStorage.setItem("token", data.signIn.token);
        this.props.navigator.push({ screen: 'RequestsScene' });
      } catch (error) {
        console.log('error', error);
      }
    }).catch((error) => {
      Alert.alert("Login failed!");
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

const mutation = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) { token }
  }`;

export const SigninSceneWithData = graphql(mutation)(SigninScene);
