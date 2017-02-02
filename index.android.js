/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// React
import React, { Component } from 'react';
import { AppRegistry, Navigator, AsyncStorage } from 'react-native';

// Apollo
import { ApolloProvider } from 'react-apollo';
import { client } from './app/store/Store';

// Scenes
import Root from './app/native/components/Root';

export default class TicketSystem extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <Root />
        </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('TicketSystem', () => TicketSystem);
