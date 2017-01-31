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
  TouchableHighlight
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { typography } from 'react-native-material-design-styles';

const typographyStyle = StyleSheet.create(typography);

class RequestsScene extends Component {
  constructor() { 
    super(); 
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.loading) { return; }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.data.requests),
    })
  }

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
               </View>
             </TouchableHighlight>
            )
          }
          enableEmptySections={true}
          />
      </View>
    );
  }

  onListItemClick(rowData) {
    this.props.navigator.push({ screen: 'RequestScene', data: rowData });
  }
}

// Initialize GraphQL queries or mutations with the `gql` tag
const query = gql`query MyQuery { requests { id, title, content } }`;

export const RequestsSceneWithData = graphql(query)(RequestsScene);

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
