import React, { Component } from 'react';
import { Platform } from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Apollo
import { ApolloProvider } from 'react-apollo';
import { client } from './app/store/Client';

// Scenes
import Root from './app/web/components/Root';

class ReactNativeWeb extends Component {
  constructor() {
    super();
    alert(Platform.OS);
  }
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

