/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { storage } from '../store/Storage';
import { Popup } from '../components/Popup';

class ButtonRemoveRequest extends Component {
  constructor(props) { 
    super(props); 
    this.state = {
      request: props.request,
    };
  }

  render() {
    return (
       <Button title="Remove" accessibilityLabel="Remove" color="red"
         onPress={this.onRequestRemove.bind(this)} 
       />
    );
  }

  onRequestRemove() {
    this.props.mutate({
      variables: { input: { id: this.state.request.id } },
      updateQueries: { // Update requests list
        Requests: (prev, { mutationResult }) => {
          console.log("REMOVING...");
          console.log(prev);
          return {
            requests: prev.requests.filter((r) => r.id !== this.state.request.id)
          };
        }
      }
    }).then(({ data }) => {
      console.log('got data', data);
    }).catch((error) => {
      Popup.show("Remove request failed!");
      console.log('there was an error sending the query', error);
    });
  }
}

const mutation = gql`
  mutation removeRequest($input: RemoveRequestInput!) {
    removeRequest(input: $input) { removed }
  }`;

export const ButtonRemoveRequestWithData = graphql(mutation)(ButtonRemoveRequest);
