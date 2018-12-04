import * as types from "../constants/ActionTypes";
import { findIndex } from 'lodash';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var guidGenerator = () => {
  var S4 = () => {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

var myReducer = (state = initialState, action) => {
  var id = '';
  var index = -1;
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.SAVE_TASK:
      var task = {
        id: action.task.id,
        name: action.task.name,
        status: (action.task.status === 'true' || action.task.status === true) ? true : false
      };
      if (!task.id) {
        task.id = guidGenerator();
        state.push(task);
      } else {
        index = findIndex(state, (item) => {
          return item.id === task.id
        });
        if (index !== -1) {
          state[index] = task;
        }
      }
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
    case types.UPDATE_STATUS:
      id = action.id;
      index = findIndex(state, (task) => {
        return task.id === id;
      });
      if (index !== -1) {
        state[index] = {
          ...state[index],
          status: !state[index].status
        };
        localStorage.setItem('tasks', JSON.stringify(state));
      }
      return [...state];
    case types.DELETE_TASK:
      id = action.id;
      index = findIndex(state, (task) => {
        return task.id === id;
      });
      if(index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(state));
      }
      return [...state];
    default:
      return state;
  }
}

export default myReducer;