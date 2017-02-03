/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import { Popup } from '../components/Popup';
import { RequestQuery } from '../constants/Queries';

export default class AddCommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      request: props.request
    }
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Add a comment'
          onChangeText={(text) => this.setState({comment: text})} value={this.state.comment}
          />
        <Button 
          color="lightgreen"
          onPress={this.onAddComment.bind(this)} 
          title="Send" accessibilityLabel="Add a new comment" />
      </View>
    );
  }

  onAddComment() {
    this.props.mutate({
      variables: { input: {
        title: "New comment",
        comment: this.state.comment, 
        request_id: this.state.request.id, 
      }
    }}).then(({ data }) => {
      console.log('got data', data);
      this.setState({
        comment: ""
      });
    }).catch((error) => {
      Popup.show("Comment not created!");
      console.log('there was an error sending the query', error);
    });
  }
}

const styles = StyleSheet.create({ });

const mutation = gql`
mutation addComment($input: AddCommentInput!) {
  addComment(input: $input) {
    comment {
      id,
      comment,
      user { name }
      created_at,
      updated_at
    }
  }
}`;

export const AddCommentComponentWithData = graphql(mutation)(AddCommentComponent);
