import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Apollo
import { ApolloProvider } from 'react-apollo';
import { client } from './app/store/Store';

// Scenes
import Root from './app/web/components/Root';

class ReactNativeWeb extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <Root />
        </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('ReactNativeWeb', () => ReactNativeWeb);
AppRegistry.runApplication('ReactNativeWeb', { rootTag: document.getElementById('react-app') });

