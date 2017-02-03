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

export default class NewRequestScene extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Create new request 
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter title'
          onChangeText={(text) => this.setState({title: text})} value={this.state.title}
          />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter content'
          onChangeText={(text) => this.setState({content: text})} value={this.state.content}
          />
        <Button 
          color="lightgreen"
          onPress={this.onSave.bind(this)} 
          title="Save" accessibilityLabel="Create request" />
      </View>
    );
  }

  onSave() {
    this.props.mutate({
      variables: { input: {
        title: this.state.title,
        content: this.state.content, 
      }
    },
      updateQueries: { // Update requests list
        Requests: (prev, { mutationResult }) => {
          console.log(prev);
          const newRequest = mutationResult.data.createRequest.request;
          const result = update(prev, {
            requests: {
              $unshift: [newRequest],
            }
          });
          console.log(result);
          return result;
          }
        }
    }).then(({ data }) => {
      this.props.navigator.push({ screen: 'RequestsScene' });
      console.log('got data', data);
    }).catch((error) => {
      Popup.show("Request not created!");
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
mutation createRequest($input: CreateRequestInput!) {
  createRequest(input: $input) {
    request {
      id,
      title,
      content,
      user { id }
    }
  }
}`;

export const NewRequestSceneWithData = graphql(mutation)(NewRequestScene);
