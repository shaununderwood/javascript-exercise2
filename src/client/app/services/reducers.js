/**
 * reducers
 */

import './actions';
import './copyObject';
import idGenerator from './IdGenerator';
import { CATEGORY, ADD_CATEGORY, EDIT_CATEGORY, SAVE_CATEGORY, DELETE_CATEGORY, MOVE_CATEGORY, ADD_ITEM, SAVE_ITEM } from './actions';

import copyObject from './copyObject';
import { createStore } from 'redux'
import { combineReducers } from 'redux';

const getNewId = idGenerator().getNewId;

export const initialState = {
  categories: {
    1: {
      type: CATEGORY,
      id: getNewId(),
      text: 'Shared Category Board',
      position: 1,
      droppable: false,
      draggable: false,
      list: []
    }
  }
};

function categories(state = {}, action) {
  if (!action) return state;

  if (action.type === ADD_CATEGORY) {
    let newState = copyObject(state);
    let newItem = newCategory(action.item);

    // currently all new categories are added to the end of item[1]
    newState[1].list.push(newItem.id);
    newItem.position = getLastPositionInList(newState[1]);
    newState[newItem.id] = newItem;
    return newState;
  }

  if (action.type === DELETE_CATEGORY) {
    // guard against deleting the top-most category, it's special
    if (action.id === 1) return state;

    // new state without category
    let newState = {};
    Object.keys(state).forEach((value) => {
      if (state[value].id !== action.id) {
        newState[value] = copyObject(state[value]);

        // remove any reference to the category from all item.list[]s
        newState[value].list = newState[value].list.filter(id => id !== action.id);
      }
    });
    return newState;
  }

  if (action.type === EDIT_CATEGORY) {
    let newState = copyObject(state);
    newState[action.id].editing = true;
    return newState;
  }

  if (action.type === SAVE_CATEGORY || action.type === SAVE_ITEM) {
    let newState = copyObject(state);
    // newState[action.id].editing = false;
    newState[action.item.id].text = action.item.text;
    return newState;
  }

  if (action.type === MOVE_CATEGORY) {
    alert('TODO: ' + MOVE_CATEGORY);
  }

  if (action.type === ADD_ITEM) {
    let newState = copyObject(state);
    let newItem = new Item(action.item, getLastPositionInList(newState[action.item.categoryId]));
    newState[action.item.categoryId].list.push(newItem.id);
    newState[newItem.id] = newItem;
    return newState;
  }

  return state;
}

// this won't be needed as everythig is a category data structure in the end
// function items(state, action){

// }

function getLastPositionInList(listContainer) {
  return listContainer.list.length + 1;
}

class Item {
  constructor(data, position) {
    this.type = 'ITEM';
    this.text = data.text;
    this.position = position;
    this.id = getNewId(this);
  }
}

// TODO really dont like what i did here
function newCategory(data) {
  let category = copyObject(data);
  category.id = getNewId(category);
  return category;
}

let categoryApp = combineReducers({
  categories,
  // items
});

export default categoryApp;