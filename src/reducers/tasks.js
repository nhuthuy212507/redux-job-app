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
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.ADD_TASK:
      var newTask = {
        id: guidGenerator(),
        name: action.task.name,
        status: action.task.status === 'true' ? true : false
      };
      state.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(state));
      return [...state];
    case types.UPDATE_STATUS:
      var id = action.id;
      var index = findIndex(state, (task) => {
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
    default:
      return state;
  }
}

export default myReducer;