// React
import React, { Component } from 'react';
import { Alert, Text } from 'react-native';

// Router
import { Router, Route, Link, hashHistory } from 'react-router'

// Scenes
import MainScene from '../../scenes/MainScene';
import { SigninSceneWithData } from '../../scenes/SigninScene';
import { SignupSceneWithData } from '../../scenes/SignupScene';
import { RequestsSceneWithData } from '../../scenes/RequestsScene';
import { NewRequestSceneWithData } from '../../scenes/NewRequestScene';
import { RequestSceneWithData } from '../../scenes/RequestScene';

// Redux
import { store } from '../../store/Store';

class Navigator {
  push(obj) {
    console.log("Navigator", obj.screen);
    switch(obj.screen) {
      case "MainScene":
        hashHistory.push('/');
        break;
      case "SigninScene":
        hashHistory.push('/signin');
        break;
      case "SignupScene":
        hashHistory.push('/signup');
        break;
      case "RequestsScene":
        hashHistory.push('/');
        break;
      case "RequestScene":
        hashHistory.push('/');
        break;
      case "NewRequestScene":
        hashHistory.push('/');
        break;
    }
  }
}

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigator: new Navigator()
    };
  }

  render() {
    return (
        <Router history={hashHistory}>
          <Route path="/" component={() => (<MainScene navigator={this.state.navigator}/>)}>
          </Route>
          <Route path="/signin" component={SigninSceneWithData}/>
          <Route path="/signup" component={SignupSceneWithData}/>
        </Router>
    );
  }
}
