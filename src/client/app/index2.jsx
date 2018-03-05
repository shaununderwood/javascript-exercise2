// import React from 'react';

// import { render } from 'react-dom';
// import ApplicationContainer from './ApplicationContainer.jsx';

// render(<ApplicationContainer />, document.getElementById('app'));

import { createStore } from 'redux';
import categoryApp from './services/reducers';

let store = createStore(categoryApp);

import {
  addCategory, deleteCategory,
} from './services/actions';

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(addCategory('countries'));
store.dispatch(addCategory('cars'));
store.dispatch(addCategory('shops'));
store.dispatch(deleteCategory(2));

// Stop listening to state updates
unsubscribe();

