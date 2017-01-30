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

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default class RequestsScene extends Component {
  //constructor() { 
  //  super(); 
  //  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
  //  this.state = { dataSource: ds.cloneWithRows(['Request 1', 'Request 2']), };
  //}

  //static get defaultProps() { 
  //  return { title: 'MainScene', navigator: null };
  //}

  //render() {
  //  return (
  //    <View style={styles.container}>
  //      <Text style={styles.welcome}>
  //        Requests
  //        {this.props.requests}
  //      </Text>

  //     <ListView dataSource={this.state.dataSource}
  //       renderRow={(rowData) => <Text>{rowData}</Text>}
  //       />
  //    </View>
  //  );
  //}
  constructor() {
    super()
  }
  render () {
    // Initialize GraphQL queries or mutations with the `gql` tag
    const query = gql`query MyQuery { requests { id } }`;

    const Request = ({ data }) => (
      <View style={{paddingLeft: 20, paddingTop: 20}}>
        <Text>Name: {data.requests && data.requests[0].id}</Text>
      </View>
    )

    const ViewWithData = graphql(query)(Request)

    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center'}}>Find President Info</Text>
        <ViewWithData />
      </View>
    )
  }
}


// Or, we can bind the execution of MyMutation to a prop
//const MyComponentWithMutation = graphql(MyMutation)(MyComponent);

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
