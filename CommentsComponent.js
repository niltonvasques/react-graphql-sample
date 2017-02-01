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
  Alert,
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { typography } from 'react-native-material-design-styles';

const typographyStyle = StyleSheet.create(typography);

export default class CommentsComponent extends Component {
  constructor(props) { 
    super(props); 
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
      dataSource: ds.cloneWithRows([]),
      request: props.request,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.loading) { return; }

    // Apollo cache is preserving the old query state
    // So we need force refetch
    // Research a better way to handle it (maybe with redux)
    if (this.state.request.id != newProps.data.request.id) {
      newProps.data.refetch();
    } else {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.data.request.comments),
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
          renderRow={(rowData) => (
             <TouchableHighlight>
               <View style={{flexDirection: 'row'}} >
                 <Text style={styles.comments}>{rowData.user.name} says: </Text>
                 <Text style={styles.comments}>{rowData.comment}</Text>
               </View>
            </TouchableHighlight>
          )}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  comments: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
});

const query = gql`query RequestQuery($id: ID!) {
  request(id: $id) {
    id,
    comments {
      id,
      comment,
      user { name },
      created_at,
      updated_at
    }
  }
}`;
export const CommentsComponentWithData = graphql(query,{
  options: (props) => ({ variables: { id: props.request.id }})
})(CommentsComponent);
