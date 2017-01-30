/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

export default class RequestsScene extends Component {
  constructor() { 
    super(); 
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = { dataSource: ds.cloneWithRows(['Request 1', 'Request 2']), };
  }

  static get defaultProps() { 
    return { title: 'MainScene', navigator: null };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Requests
        </Text>

       <ListView dataSource={this.state.dataSource}
         renderRow={(rowData) => <Text>{rowData}</Text>}
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
