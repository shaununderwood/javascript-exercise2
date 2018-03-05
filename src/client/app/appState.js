
// import { combineReducers, createStore } from 'redux';
// const reducer = combineReducers({ visibilityFilter, todos });
// const store = createStore(reducer);


// function* idGenerator(startValue = 1) {
//   while (true) yield startValue++;
// }
// idGen = idGenerator();
// idMap = {};
// getNewId = (ptr = null) => {
//   let id = idGen.next().value;
//   if (ptr !== null) idMap[id] = ptr;
//   return id;
// };

// actions = [
//   { type: 'ADD_CATEGORY', text: 'A New Category' },
//   { type: 'EDIT_CATEGORY', editing: true },
//   { type: 'SAVE_CATEGORY', editing: false, text: 'Updated Category Name' },
//   { type: 'DELETE_CATEGORY', id: 2 },
//   { type: 'UPDATE_CATEGORY', text: 'New Name for Category' },
//   {
//     type: 'ADD_ITEM', item: {
//       type: 'item',
//       id: getNewId(),
//       text: 'ivan',
//       position: 3,
//     },
//   },
//   {
//     type: 'MOVE_ITEM', move: {
//       item: {},
//       to: {
//         category: 1,
//         position: 2
//       }
//     }
//   }
// ];

// function categories(state = [], action) {
//   if (action.type === 'ADD_CATEGORY') {
//     return [...state, {
//       type: 'category',
//       id: action.id,
//       text: action.text,
//       position: action.position,
//       list: []
//     }];
//   }
//   if (action.type === 'DELETE_CATEGORY') {
//     return state.filter(item => (item.type === 'category' && item.id === action.id) ? false : true);
//   }
// }

// appState = {
//   items: {
//     1: {
//       type: 'category',
//       id: getNewId(),
//       text: 'Shared Category Board',
//       position: 1,
//       droppable: false,
//       draggable: false,
//       list: [
//         3, 4, 5
//       ]
//     }
//   },

//   categories: {
//     type: 'category',
//     id: getNewId(),
//     text: 'Shared Category Board',
//     position: 1,
//     droppable: false,
//     draggable: false,
//     list: [
//       {
//         type: 'category',
//         id: getNewId(),
//         text: 'places',
//         position: 1,
//         list: [
//           {
//             type: 'item',
//             id: getNewId(),
//             text: 'london',
//             position: 1,
//           },
//         ]
//       },
//       {
//         type: 'category',
//         id: getNewId(),
//         text: 'people',
//         position: 1,
//         list: [
//           {
//             type: 'item',
//             id: getNewId(),
//             text: 'julia',
//             position: 1,
//           },
//           {
//             type: 'item',
//             id: getNewId(),
//             text: 'shaun',
//             position: 2,
//           },
//           {
//             type: 'category',
//             id: getNewId(),
//             text: 'surnames',
//             position: 1,
//             list: [
//               {
//                 type: 'item',
//                 id: getNewId(),
//                 text: 'underwood',
//                 position: 1,
//               },
//               {
//                 type: 'item',
//                 id: getNewId(),
//                 text: 'strok underwood',
//                 position: 2,
//               },
//             ]
//           }
//         ]
//       }
//     ]
//   },


// };