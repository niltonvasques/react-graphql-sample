/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import MainScene from './MainScene';
import SigninScene from './SigninScene';
import SignupScene from './SignupScene';
import RequestsScene from './RequestsScene';

export default class TicketSystem extends Component {
  render() {
    return (
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
    );
  }
}

AppRegistry.registerComponent('TicketSystem', () => TicketSystem);
