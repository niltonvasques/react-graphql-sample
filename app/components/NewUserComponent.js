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
import update from 'immutability-helper';

import { Popup } from '../components/Popup';
import { RegisterAgentMutation } from '../constants/Queries';
import { RegisterAdminMutation } from '../constants/Queries';

export default class NewUserComponent extends Component {
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
        <View style={{flexDirection: 'row'}} >
          <TextInput
            style={{height: 40, borderColor: 'gray', marginLeft: 5, borderWidth: 1, flex: 0.3}}
            placeholder='Enter username'
            onChangeText={(text) => this.setState({name: text})} value={this.state.name}
            />
          <TextInput
            style={{height: 40, borderColor: 'gray', marginLeft: 5, borderWidth: 1, flex: 0.2}}
            placeholder='Enter your email'
            onChangeText={(text) => this.setState({email: text})} value={this.state.email}
            />
          <TextInput
            style={{height: 40, borderColor: 'gray', marginLeft: 5, borderWidth: 1, flex: 0.2}}
            placeholder='Enter a password'
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            />
          <View style={{flex: 0.3, flexDirection: 'row', height: 40, justifyContent: 'flex-end'}} >
            <Button 
              color="lightgreen"
              onPress={this.onSave.bind(this)} 
              title="Create new user" accessibilityLabel="Create a new user" />
          </View>
        </View>
    );
  }

  onSave() {
    this.props.mutate({
      variables: { input: {
        name: this.state.name, 
        email: this.state.email,
        password: this.state.password, 
        password_confirmation: this.state.password, 
      }
    },
      updateQueries: { // Update requests list
        Users: (prev, { mutationResult }) => {
          const newUser = mutationResult.data.registerAgent.agent;
          const result = update(prev, {
            users: {
              $unshift: [newUser],
            }
          });
          return result;
        }
      }
    }).then(({ data }) => {
      console.log('got data', data);
      this.setState({ name: "", email: "", password: "" });
    }).catch((error) => {
      Popup.show("User not created!");
      console.log('there was an error sending the query', error);
    });
  }
}

export const NewUserComponentWithData = graphql(RegisterAgentMutation)(NewUserComponent);
