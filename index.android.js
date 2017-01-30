/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert
} from 'react-native';

import MainScene from './MainScene';


export default class TicketSystem extends Component {
  render() {
    return (
        <MainScene />
    );
  }
}

AppRegistry.registerComponent('TicketSystem', () => TicketSystem);
