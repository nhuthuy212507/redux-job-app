import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditing from './taskEditing';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';

const myReducer = combineReducers({
  tasks,
  isDisplayForm,
  taskEditing,
  filterTable,
  search,
  sort
});

export default myReducer;