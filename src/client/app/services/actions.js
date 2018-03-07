/**
 *  action types
 */

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';
export const SAVE_CATEGORY = 'SAVE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const MOVE_CATEGORY = 'MOVE_CATEGORY';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const SAVE_ITEM = 'SAVE_ITEM';

export const MOVE_ITEM = 'MOVE_ITEM'; // doubles as move category

export const CATEGORY = 'CATEGORY';
export const ITEM = 'ITEM';

/**
 * action creators
 */

export function addCategory(text, droppable = true, draggable = true) {
  return {
    type: ADD_CATEGORY,
    item: {
      type: CATEGORY,
      id: null,
      text: text,
      position: null,
      droppable: droppable,
      draggable: draggable,
      list: []
    }
  };
}
export function updateCategory(delta) {
  return {
    type: SAVE_CATEGORY, item: delta
  };
}
export function deleteCategory(id) {
  return { type: DELETE_CATEGORY, id: id };
}
export function moveCateogry(id, fromCategoryId, toCategoryId, toPosition) {
  return {
    type: MOVE_ITEM,
    item: {
      id: id,
      fromCategoryId: fromCategoryId,
      toCategoryId: toCategoryId,
      toPosition: toPosition
    }
  };
}
export function updateItem(delta) {
  return {
    type: SAVE_ITEM, item: delta
  };
}
export function addItem(item) {
  return {
    type: ADD_ITEM,
    item: {
      type: ITEM,
      categoryId: item.categoryId,
      text: item.text
    }
  };
}



