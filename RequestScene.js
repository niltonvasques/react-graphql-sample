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
  AsyncStorage
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { typography } from 'react-native-material-design-styles';

const typographyStyle = StyleSheet.create(typography);

class RequestScene extends Component {
  constructor(props) { 
    super(props); 
    this.state = {
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={[typographyStyle.paperFontTitle, styles.welcome]}>
          Request #{this.state.request.id}
        </Text>
        <Text style={[typographyStyle.paperFontTitle, styles.welcome]}>
          {this.state.request.title}
        </Text>
        <Text style={[typographyStyle.paperFontTitle, styles.welcome]}>
          {this.state.request.content}
        </Text>
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
