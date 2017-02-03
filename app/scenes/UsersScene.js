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
  TouchableHighlight,
  Button,
  TextInput,
  Picker,
  Platform
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import { typography } from 'react-native-material-design-styles';

const typographyStyle = StyleSheet.create(typography);

import { storage } from '../store/Storage';

// Redux
import { store } from '../store/Store';
import { UsersQuery } from '../constants/Queries';

import { ButtonRemoveUserWithData } from '../components/ButtonRemoveUser';
import { NewUserComponentWithData } from '../components/NewUserComponent';

class UsersScene extends Component {
  constructor(props) { 
    super(props); 
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
      dataSource: ds.cloneWithRows([]),
      users: [],
      user: { customer: false, agent: false, admin: false },
      newUser: { name: '', email: '', password: '', role: 'customer' }
    };
  }

  componentDidMount() {
    storage.getItem('user', (user) => this.setState({ user: JSON.parse(user)}));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.loading) { return; }
    if (!newProps.data.users) { return; }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.data.users),
      users: newProps.data.users
    })
  }

  getRole(user) {
    if (user.admin) return 'Admin';
    if (user.agent) return 'Agent';
    return 'Customer';
  }

  // Rendering
  render() {
    return (
      <View style={styles.container}>
        <Text style={[typographyStyle.paperFontTitle, styles.welcome]}>
          Users
        </Text>

        <NewUserComponentWithData />

        <ListView dataSource={this.state.dataSource}
          renderRow={(rowData) => (
           <View style={{flexDirection: 'row', flex: 1}} >
               <View style={{flexDirection: 'row', flex: 0.7}} >
             <TouchableHighlight >
               <View style={{flexDirection: 'row'}} >
                 <Text style={styles.users}>{rowData.id}</Text>
                 <Text style={styles.users}>{rowData.name}</Text>
                 <Text style={styles.users}>{rowData.email}</Text>
                 <Text style={styles.users}>{this.getRole(rowData)}</Text>
               </View>
             </TouchableHighlight>
               </View>
             <View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end'}} >
               <ButtonRemoveUserWithData user={rowData} />
             </View>
           </View>
          )
        }
        enableEmptySections={true}
        />
      </View>
    );
  }

  onNewUser() {
    this.props.navigator.push({ screen: 'NewUserScene' });
  }

}

export const UsersSceneWithData = graphql(UsersQuery, {
  options: { pollInterval: 5000 },
})(UsersScene);

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
  users: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
});
