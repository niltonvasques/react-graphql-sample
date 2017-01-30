/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// React
import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

// Apollo
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// Scenes
import MainScene from './MainScene';
import SigninScene from './SigninScene';
import SignupScene from './SignupScene';
import RequestsScene from './RequestsScene';

const client = new ApolloClient();

export default class TicketSystem extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <Navigator 
            initialRoute={{ screen: 'MainScene', index: 0 }}
            renderScene={(route, nav) => {
              switch(route.screen) {
                case "MainScene":
                  return <MainScene navigator={nav} />
                case "SigninScene":
                    return <SigninScene navigator={nav} />
                case "SignupScene":
                      return <SignupScene navigator={nav} />
                case "RequestsScene":
                        return <RequestsScene navigator={nav} />
              }
            }}
          />
        </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('TicketSystem', () => TicketSystem);
