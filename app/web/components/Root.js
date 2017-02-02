// React
import React, { Component } from 'react';
import { Alert, Text } from 'react-native';

// Router
import { Router, Route, Link, hashHistory } from 'react-router'

// Scenes
import MainScene from '../../scenes/MainScene';
import { SigninSceneWithData } from '../../scenes/SigninScene';
//import { SignupSceneWithData } from '../scenes/SignupScene';
//import { RequestsSceneWithData } from '../scenes/RequestsScene';
//import { NewRequestSceneWithData } from '../scenes/NewRequestScene';
//import { RequestSceneWithData } from '../scenes/RequestScene';

// Redux
import { store } from '../../store/Store';

export default class Root extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <Router history={hashHistory}>
          <Route path="/" component={MainScene}>
          </Route>
          <Route path="/signin" component={SigninSceneWithData}/>
        </Router>
    );
  }
}
