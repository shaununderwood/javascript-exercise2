import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import app from './services/reducers';
import App from './components/App.jsx';

let store = createStore(app);


import { addCategory, deleteCategory } from './services/actions';

store.dispatch(addCategory('countries'));
store.dispatch(addCategory('cars'));
store.dispatch(addCategory('shops'));


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
