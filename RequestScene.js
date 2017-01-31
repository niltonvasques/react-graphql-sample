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
  Alert
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { typography } from 'react-native-material-design-styles';

const typographyStyle = StyleSheet.create(typography);

export default class RequestScene extends Component {
  constructor() { 
    super(); 
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.loading) { return; }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[typographyStyle.paperFontTitle, styles.welcome]}>
          Request - {this.props.request.id}
        </Text>
      </View>
    );
  }
}

// Initialize GraphQL queries or mutations with the `gql` tag
//const query = gql`query MyQuery { request(id: $id) { id, title, content } }`;
//
//export const RequestSceneWithData = graphql(query)(RequestScene);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
