import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './actions/index';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
    };
  }

  onToggleForm = () => {
    var { taskEditing } = this.props;
    if (taskEditing && taskEditing.id !== '') {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
    this.props.onClearForm({
      id : '',
      name: '',
      status: false
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    });
  }

  onSort = (sort) => {
    this.setState({
      sort: {
        by: sort.by,
        value: sort.value
      }
    });
  }
  
  render() {
    var { isDisplayForm } = this.props;

    //search global
    // if (keyword) {
    //   // tasks = tasks.filter(task => {
    //   //   return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   // });
    //   tasks = filter(tasks, (task) => {
    //     return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    //   });
    // }

    //sort
    // if (sort.by === 'name') {
    //   // tasks.sort((a, b) => {
    //   //   if (a.name > b.name) return sort.value;
    //   //   else if (a.name < b.name) return -sort.value;
    //   //   else return 0;
    //   // });
    //   tasks = orderBy(tasks, ['name'], [sort.value === 1 ? 'asc' : 'desc']);
    // } else {
    //   // tasks.sort((a, b) => {
    //   //   if (a.status > b.status) return -sort.value;
    //   //   else if (a.status < b.status) return sort.value;
    //   //   else return 0;
    //   // });
    //   tasks = orderBy(tasks, ['status'], [sort.value === -1 ? 'asc' : 'desc']);
    // }

    return (
      <div className="wrapper">
        <div className="container">
          <h1 className="text-center site-title">Job Management</h1>
          <div className="row">
            <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
              <TaskForm />
            </div>
            <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={this.onToggleForm}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Add New Job
                  </button>
                </div>
              </div>
              <TaskControl 
                onSearch={this.onSearch}
                onSort={this.onSort}
              />
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    taskEditing: state.taskEditing
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      return dispatch(actions.toggleForm());
    },
    onClearForm: (task) => {
      return dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      return dispatch(actions.openForm());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
