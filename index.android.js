/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// React
import React, { Component } from 'react';
import { AppRegistry, Navigator, AsyncStorage } from 'react-native';

// Apollo
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// Scenes
import RootComponent from './RootComponent';

const  networkInterface = createNetworkInterface({ uri: 'http://10.0.2.2:3000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    try {
      AsyncStorage.getItem('token').then((value) => {
        if (value !== null){
          req.options.headers['authorization'] = `Token token="${value}"`;
          // We have data!!
          console.log(value);
        }
        next();
      }).done();
    } catch (error) {
      console.log('error', error);
    }
  }
}]);

const client = new ApolloClient({
  networkInterface: networkInterface,
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
