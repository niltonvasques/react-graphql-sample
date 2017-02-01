// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// Apollo
import ApolloClient, { createNetworkInterface, toIdValue } from 'apollo-client';

import { AsyncStorage } from 'react-native';

const networkInterface = createNetworkInterface({ uri: 'http://10.0.2.2:3000/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    try {
      AsyncStorage.getItem('token').then((value) => {
        if (value !== null){
          req.options.headers['authorization'] = `Token token="${value}"`;
          // We have data!!
          console.log(value);
        }
        next();
      }).done();
    } catch (error) {
      console.log('error', error);
    }
  }
}]);
const dataIdFromObject = (result) => {
  if (result.id && result.__typename) {
    return result.__typename + result.id;
  }

  // Make sure to return null if this object doesn't have an ID
  return null;
}

export const client = new ApolloClient({
  networkInterface: networkInterface,
  addTypename: true,
  dataIdFromObject: dataIdFromObject,
  customResolvers: {
    Query: {
      requests: (_, args) => toIdValue(dataIdFromObject({ __typename: 'Request', id: args['id'] })),
    },
  },
});

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      //window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);
