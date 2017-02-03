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

import { RemoveUserMutation } from '../constants/Queries';

class ButtonRemoveUser extends Component {
  constructor(props) { 
    super(props); 
    this.state = {
      user: props.user,
    };
  }

  render() {
    return (
       <Button title="Remove" accessibilityLabel="Remove" color="red"
         onPress={this.onUserRemove.bind(this)} 
       />
    );
  }

  onUserRemove() {
    this.props.mutate({
      variables: { input: { id: this.state.user.id } },
      updateQueries: { // Update requests list
        Users: (prev, { mutationResult }) => {
          return {
            users: prev.requests.filter((r) => r.id !== this.state.user.id)
          };
        }
      }
    }).then(({ data }) => {
      console.log('got data', data);
    }).catch((error) => {
      Popup.show("Remove user failed!");
      console.log('there was an error sending the query', error);
    });
  }
}

export const ButtonRemoveUserWithData = graphql(RemoveUserMutation)(ButtonRemoveUser);
