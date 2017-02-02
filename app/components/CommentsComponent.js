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

import { AddCommentComponentWithData } from './AddCommentComponent';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { typography } from 'react-native-material-design-styles';

const typographyStyle = StyleSheet.create(typography);

import { RequestQuery } from '../constants/Queries';
import update from 'immutability-helper';

export default class CommentsComponent extends Component {
  constructor(props) { 
    super(props); 
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); 
    this.state = {
      dataSource: ds.cloneWithRows([]),
      request: props.request,
      comments: [],
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.loading) { return; }
    if (!newProps.data.request) { 
      console.log("PROPS FAILED");
      console.log(newProps.data);
      return;
    }

    // Apollo cache is preserving the old query state
    // So we need force refetch
    // Research a better way to handle it (maybe with redux)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newProps.data.request.comments),
    })
  }

  // Rendering
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
        {this.renderAddComment()}
      </View>
    );
  }

  renderAddComment() {
    if (!this.state.request.open) return null;
    return (
        <AddCommentComponentWithData request={this.state.request} />
    )
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

export const CommentsComponentWithData = graphql(RequestQuery, {
  props(props) {
    return props; 
  },
  options(props) {
    console.log("OPTIONS");
    console.log(props);
    return {
      variables: { id: props.request.id },
      reducer: (previousResult, action, variables) => {
        if (action.type === 'APOLLO_MUTATION_RESULT' && action.operationName === 'addComment'){
          const result = update(previousResult, {
            request: {
              comments: {
                $push: [action.result.data.addComment.comment],
              },
            },
          });
          console.log(result);
          return result;
        }
        return previousResult;
      },
    };
  },
} 
)(CommentsComponent);
