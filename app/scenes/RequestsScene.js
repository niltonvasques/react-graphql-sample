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
  Alert,
  TouchableHighlight,
  Button,
  AsyncStorage
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { typography } from 'react-native-material-design-styles';

const typographyStyle = StyleSheet.create(typography);

// Redux
import { store } from '../store/Store';

import { RequestsQuery } from '../constants/Queries';

class RequestsScene extends Component {
  constructor(props) { 
    super(props); 
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
      dataSource: ds.cloneWithRows([]),
      user: { customer: false, agent: false, admin: false }
    };
    this.restoreUser();
    console.log("CONSTRUCTOR");
    console.log(store.getState().apollo.data);
  }

  async restoreUser() {
    var user = await AsyncStorage.getItem('user');
    this.setState({ user: JSON.parse(user)});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.loading) { return; }
    if (!newProps.data.requests) { return; }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.data.requests),
    })
  }

  // Rendering
  render() {
    return (
      <View style={styles.container}>
        <Text style={[typographyStyle.paperFontTitle, styles.welcome]}>
          Requests
        </Text>

        <ListView dataSource={this.state.dataSource}
          renderRow={(rowData) => (
             <TouchableHighlight onPress={this.onListItemClick.bind(this, rowData)}>
               <View style={{flexDirection: 'row'}} >
                 <Text style={styles.requests}>{rowData.id}</Text>
                 <Text style={styles.requests}>{rowData.title}</Text>
                 <Text style={styles.requests}>{rowData.open ? 'Open' : 'Closed'}</Text>
               </View>
             </TouchableHighlight>
            )
          }
          enableEmptySections={true}
          />
          {this.renderNewRequestButton()}
      </View>
    );
  }

  renderNewRequestButton() {
    if (!this.state.user.customer) return null;
    return (
        <Button 
          color="lightgreen"
          onPress={this.onNewRequest.bind(this)} 
          title="Create new request" accessibilityLabel="Create a new request" />
        )
  }


  // Callbacks
  onListItemClick(rowData) {
    this.props.navigator.push({ screen: 'RequestScene', data: rowData });
  }

  onNewRequest() {
    this.props.navigator.push({ screen: 'NewRequestScene' });
  }
}

export const RequestsSceneWithData = graphql(RequestsQuery)(RequestsScene);

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
  requests: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
});
