// React
import React, { Component } from 'react';

// Router
import { Router, Route, Link, hashHistory } from 'react-router'

// Scenes
import MainScene from '../../scenes/MainScene';
import AdminScene from '../../scenes/AdminScene';
import { SigninSceneWithData } from '../../scenes/SigninScene';
import { SignupSceneWithData } from '../../scenes/SignupScene';
import { RequestsSceneWithData } from '../../scenes/RequestsScene';
import { NewRequestSceneWithData } from '../../scenes/NewRequestScene';
import { RequestSceneWithData } from '../../scenes/RequestScene';

// Redux
import { store } from '../../store/Store';
const state = {
  request: null
};

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
        hashHistory.push('/requests');
        break;
      case "RequestScene":
        state.request = obj.data;
        hashHistory.push(`/request/${obj.data.id}`);
        break;
      case "NewRequestScene":
        hashHistory.push('/requests/new');
        break;
      case "AdminScene":
        hashHistory.push('/admin');
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
          <Route path="/signin" 
            component={() => (<SigninSceneWithData navigator={this.state.navigator}/>)}/>
          <Route path="/signup" 
            component={() => (<SignupSceneWithData navigator={this.state.navigator}/>)}/>
          <Route path="/requests" 
            component={() => (<RequestsSceneWithData navigator={this.state.navigator}/>)} />
          <Route path="/request/:id" 
            component={() => (<RequestSceneWithData navigator={this.state.navigator}
                request={state.request}/>)}/>
          <Route path="/requests/new" 
            component={() => (<NewRequestSceneWithData navigator={this.state.navigator}/>)} />
          <Route path="/admin" 
            component={() => (<AdminScene navigator={this.state.navigator}/>)} />
        </Router>
    );
  }
}
