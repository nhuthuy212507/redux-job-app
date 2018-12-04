import * as types from '../constants/ActionTypes';

var initialState = '';

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_GLOBAL:
      return action.keyword.toLowerCase().trim();
    default:
      return state;
  }
}

export default myReducer;