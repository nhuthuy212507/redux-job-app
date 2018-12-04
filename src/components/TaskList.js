import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';

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
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value
    });
  }
  

  render() {
    const { tasks } = this.props;
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
    tasks: state.tasks
  };
}

export default connect(mapStateToProps, null) (TaskList);