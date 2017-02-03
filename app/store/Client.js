// Redux
import { applyMiddleware } from 'redux';

// Apollo
import ApolloClient, { createNetworkInterface, toIdValue } from 'apollo-client';

import { storage } from './Storage';
import { Platform } from 'react-native';

const setupApollo = () => {
  var uri = 'http://10.0.2.2:3000/graphql';
  if (Platform.OS == 'web') uri = 'http://localhost:3000/graphql';

  const networkInterface = createNetworkInterface({ uri: uri });

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      try {
        storage.getItem('token', (value) => {
          if (value !== null){
            req.options.headers['authorization'] = `Token token="${value}"`;
            console.log(value);
          }
          next();
        });
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

  return new ApolloClient({
    networkInterface: networkInterface,
    addTypename: true,
    dataIdFromObject: dataIdFromObject,
    customResolvers: {
      Query: {
        requests: (_, args) => {
          toIdValue(dataIdFromObject({ __typename: 'Request', id: args['id'] }))
        },
      },
    },
  });
}

export const client = setupApollo();
