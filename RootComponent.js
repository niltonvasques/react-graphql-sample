// React
import React, { Component } from 'react';
import { Alert, Navigator, Text, BackAndroid } from 'react-native';

// Scenes
import MainScene from './MainScene';
import { SigninSceneWithData } from './SigninScene';
import { SignupSceneWithData } from './SignupScene';
import { RequestsSceneWithData } from './RequestsScene';
import { NewRequestSceneWithData } from './NewRequestScene';
import { RequestSceneWithData } from './RequestScene';

// Redux
import { store } from './Store';

export default class RootComponent extends Component {
  constructor() {
    super();
    navigator = null;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if (navigator) {
        navigator.pop();
        return true;
      }
      return false;
    });
  }
  render() {
    return (
      <Navigator 
        initialRoute={{ screen: 'MainScene', index: 0 }}
        renderScene={(route, nav) => {
          navigator = nav;
          switch(route.screen) {
            case "MainScene":
              return <MainScene navigator={nav} />
            case "SigninScene":
              return <SigninSceneWithData navigator={nav} />
            case "SignupScene":
              return <SignupSceneWithData navigator={nav} />
            case "RequestsScene":
              return <RequestsSceneWithData navigator={nav} />
            case "RequestScene":
              return <RequestSceneWithData navigator={nav} request={route.data} />
            case "NewRequestScene":
              return <NewRequestSceneWithData navigator={nav} />
          }
        }}
        //navigationBar={
        //  <Navigator.NavigationBar
        //    routeMapper={{
        //      LeftButton: (route, navigator, index, navState) => {
        //        return (<Text></Text>);
        //      },
        //      RightButton: (route, navigator, index, navState) => {
        //        return (<Text></Text>);
        //      },
        //      Title: (route, navigator, index, navState) => {
        //        return (<Text style={{fontSize: 20}}>Ticket System</Text>);
        //      }, }}
        //    style={{backgroundColor: 'gray'}}
        //  />
        //}
      />
    );
  }
}
