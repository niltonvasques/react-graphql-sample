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
  ListView,
  Button,
  Alert,
  TextInput,
  AsyncStorage
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { typography } from 'react-native-material-design-styles';

const typographyStyle = StyleSheet.create(typography);

import { CommentsComponentWithData } from './CommentsComponent';
import { AddCommentComponentWithData } from './AddCommentComponent';

class RequestScene extends Component {
  constructor(props) { 
    super(props); 
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
      dataSource: ds.cloneWithRows([
        "Hello there", "There is a problem here"
      ]),
      request: props.request,
      user: { customer: false, agent: false, admin: false }
    };
    this.restoreUser();
  }

  async restoreUser() {
    var user = await AsyncStorage.getItem('user');
    this.setState({ user: JSON.parse(user)});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.loading) { return; }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.data.request.comments),
    })
  }

  renderCloseRequest() {
    if (!this.state.request.open) return null;
    return (
        <Button 
          color="red"
          onPress={this.onCloseRequest.bind(this)} 
          title="Close request" accessibilityLabel="Close request" />
        )
  }

  renderAddComment() {
    if (!this.state.request.open) return null;
    return (
        <AddCommentComponentWithData request={this.state.request} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[typographyStyle.paperFontTitle, styles.welcome]}>
          Request #{this.state.request.id} - {this.state.request.open ? 'Open' : 'Closed'}
        </Text>
        <Text style={[typographyStyle.paperFontTitle, styles.welcome]}>
          {this.state.request.title}
        </Text>
        <Text style={[typographyStyle.paperFontTitle, styles.welcome]}>
          {this.state.request.content}
        </Text>

        <CommentsComponentWithData request={this.state.request} />

        {this.renderAddComment()}
        {this.renderCloseRequest()}
      </View>
    );
  }

  onCloseRequest() {
    this.props.mutate({
      variables: { input: { id: this.props.request.id } }
    }).then(({ data }) => {
      console.log('got data', data);
      this.setState({
        request: data.closeRequest.request
      });
    }).catch((error) => {
      Alert.alert("Close request failed!");
      console.log('there was an error sending the query', error);
    });
  }

  onAddComment() {
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  requests: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
});

const mutation = gql`
  mutation closeRequest($input: CloseRequestInput!) {
    closeRequest(input: $input) { request { id, open, content, title, user { id } } }
  }`;

export const RequestSceneWithData = graphql(mutation)(RequestScene);
