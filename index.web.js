import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

// Apollo
import { ApolloProvider } from 'react-apollo';
import { client } from './app/store/Client';

// Scenes
import Root from './app/web/components/Root';

class ReactNativeWeb extends Component {
  constructor() {
    super();
  }
  render() {
    return (
        <ApolloProvider client={client}>
          <Root />
        </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('TicketSystemWeb', () => ReactNativeWeb);
AppRegistry.runApplication('TicketSystemWeb', { rootTag: document.getElementById('react-app') });

