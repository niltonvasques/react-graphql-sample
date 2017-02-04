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

import { storage } from '../store/Storage';
import { SignInMutation, RequestsQuery } from '../constants/Queries';
import Logo from '../components/Logo';
import { Popup } from '../components/Popup';

export default class SigninScene extends Component {
  constructor() {
    super();
    this.state = {
      email: "test3@dev.com",
      password: "123456",
    }
  }

  componentDidMount() {
    storage.setItem('user', null);
    storage.setItem('token', null);
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
      variables: { input: { email: this.state.email, password: this.state.password } },
      refetchQueries: [{
        query: RequestsQuery,
      }],
    }).then(({ data }) => {
      console.log('got data', data);
      storage.setItem("token", data.signIn.data.token);
      storage.setItem("user", JSON.stringify(data.signIn.data.user));
      if (data.signIn.data.user.admin) {
        this.props.navigator.push({ screen: 'AdminScene' });
      } else {
        this.props.navigator.push({ screen: 'RequestsScene' });
      }
    }).catch((error) => {
      console.log('there was an error sending the query', error);
      Popup.show("Login failed!");
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

export const SigninSceneWithData = graphql(SignInMutation)(SigninScene);
