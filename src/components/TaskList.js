import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import * as actions from '../actions/index';
import { orderBy } from 'lodash';

class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    };
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    var filter = {
      name: name === 'filterName' ? value : this.state.filterName,
      status: name === 'filterStatus' ? value : this.state.filterStatus
    }
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value
    });
  }

  render() {
    var { tasks, filterTable, keyword, sort } = this.props;

    if (filterTable.name) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
      });
    }

    if (filterTable.status !== -1) {
      tasks = tasks.filter(task => {
        return task.status === (filterTable.status === 1 ? true : false);
      });
    }

    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    if (sort) {
      if (sort.by === 'name') {
        tasks = orderBy(tasks, ['name'], [sort.value === 1 ? 'asc' : 'desc']);
      } else {
        tasks = orderBy(tasks, ['status'], [sort.value === -1 ? 'asc' : 'desc']);
      }
    }

    const elmTask = tasks.map((task, index) => (
      <TaskItem 
        key={task.id}
        index={index + 1}
        task={task}
      />
    ));
    return (
      <table className="table table-bordered table-hover job-list">
        <thead>
          <tr>
            <th className="text-center">No.</th>
            <th className="text-center">Name</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input 
                type="text" 
                name="filterName" 
                className="form-control" 
                onChange={this.onChange}
              />
            </td>
            <td>
              <select 
                name="filterStatus" 
                className="form-control"
                onChange={this.onChange}
              >
                <option value={-1}>All</option>
                <option value={1}>Enable</option>
                <option value={0}>Disable</option>
              </select>
            </td>
            <td></td>
          </tr>
          { elmTask }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      return dispatch(actions.filterTask(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (TaskList);