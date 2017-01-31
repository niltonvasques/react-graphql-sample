/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// React
import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

// Apollo
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// Scenes
import RootComponent from './RootComponent';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://10.0.2.2:3000/graphql' }),
});

export default class TicketSystem extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <RootComponent />
        </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('TicketSystem', () => TicketSystem);
