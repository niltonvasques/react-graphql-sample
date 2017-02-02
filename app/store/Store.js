// Redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// Apollo
import { client } from './Client';

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
