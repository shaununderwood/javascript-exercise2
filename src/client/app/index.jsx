import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app from './services/reducers';
import App from './components/App.jsx';

import { compose, applyMiddleware } from 'redux';
import scuttlebutt, { devToolsStateSanitizer } from 'redux-scuttlebutt';
const devToolsConfig = {
  stateSanitizer: devToolsStateSanitizer
}
const enhancer = compose(
  scuttlebutt(),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__(devToolsConfig)
    : f => f
)

import { initialState } from './services/reducers';
const store = createStore(app, initialState, enhancer)

// import { addCategory, deleteCategory } from './services/actions';
// store.dispatch(addCategory('countries'));
// store.dispatch(addCategory('cars'));
// store.dispatch(addCategory('shops'));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
