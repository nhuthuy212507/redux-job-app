import React, { Component } from 'react';
import { findIndex, filter, orderBy } from 'lodash';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      taskEditing: '',
      search: {
        name: '',
        status: -1
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1
      }
    };
  }

  componentWillMount() {
    localStorage && localStorage.getItem('tasks') && this.setState({
      tasks: JSON.parse(localStorage.getItem('tasks'))
    });
  }

  onToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== '') {
      this.setState({
        isDisplayForm: true,
        taskEditing: ''
      });
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm
      });
    }
  }

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === '') {
      var task = {
        id: this.guidGenerator(),
        name: data.name,
        status: data.status === 'true' ? true : false
      };
      tasks.push(task);
    } else {
      var index = this.findIndex(data.id);
      data.status = data.status === 'true' ? true : false;
      tasks[index] = data;
    }
    
    this.setState({
      tasks: tasks,
      taskEditing: null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var {tasks} = this.state;
    var index = findIndex(tasks, (task) => {
      return task.id === id;
    });
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.onCloseForm();
    }
  }

  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
      isDisplayForm: true
    });
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      search: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
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

  findIndex = (id) => {
    var result = -1;
    var {tasks} = this.state;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        return result = index;
      }
    });
    return result;
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
      taskEditing: ''
    });
  }
  
  guidGenerator = () => {
      var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }
  
  render() {
    var { tasks, isDisplayForm, taskEditing, search, keyword, sort } = this.state;

    //search table
    if (search) {
      if (search.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(search.name) !== -1;
        });
      }
      tasks = tasks.filter(task => {
        if (search.status === -1) {
          return task;
        } else {
          return task.status === (search.status === 1 ? true : false);
        }
      });
    }

    //search global
    if (keyword) {
      // tasks = tasks.filter(task => {
      //   return task.name.toLowerCase().indexOf(keyword) !== -1;
      // });
      tasks = filter(tasks, (task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }

    //sort
    if (sort.by === 'name') {
      // tasks.sort((a, b) => {
      //   if (a.name > b.name) return sort.value;
      //   else if (a.name < b.name) return -sort.value;
      //   else return 0;
      // });
      tasks = orderBy(tasks, ['name'], [sort.value === 1 ? 'asc' : 'desc']);
    } else {
      // tasks.sort((a, b) => {
      //   if (a.status > b.status) return -sort.value;
      //   else if (a.status < b.status) return sort.value;
      //   else return 0;
      // });
      tasks = orderBy(tasks, ['status'], [sort.value === -1 ? 'asc' : 'desc']);
    }

    const elmForm = isDisplayForm ? 
      <TaskForm 
        onCloseForm={this.onCloseForm} 
        onSubmit={this.onSubmit}
        taskEditing={taskEditing}
      /> : '';
    return (
      <div className="wrapper">
        <div className="container">
          <h1 className="text-center site-title">Job Management</h1>
          <div className="row">
            <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
              { elmForm }
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
                  <TaskList 
                    tasks={tasks}
                    onUpdateStatus={this.onUpdateStatus}
                    onDelete={this.onDelete}
                    onUpdate={this.onUpdate}
                    onFilter={this.onFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
