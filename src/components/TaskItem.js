import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {

  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  }

  onDelete = () => {
    this.props.onDelete(this.props.task.id);
    this.props.onCloseForm();
  }

  onUpdate = () => {
    this.props.onOpenForm();
    this.props.onEditTask(this.props.task);
  }

  render() {
    const { index, task } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span 
            className={task.status ? 'label label-success' : 'label label-danger'}
            onClick={this.onUpdateStatus}
          >
            {task.status ? 'Enable' : 'Disable'}
          </span>
        </td>
        <td className="text-center">
          <button 
            type="button" 
            className="btn btn-sm btn-primary"
            onClick={this.onUpdate}
          ><i className="fa fa-pencil" aria-hidden="true"></i> Edit</button>&nbsp;
          <button 
            type="button" 
            className="btn btn-sm btn-danger"
            onClick={this.onDelete}
          ><i className="fa fa-trash" aria-hidden="true"></i> Delete</button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => {
      dispatch(actions.updateStatus(id))
    },
    onDelete: (id) => {
      dispatch(actions.deleteTask(id))
    },
    onCloseForm: () => {
      dispatch(actions.closeForm())
    },
    onOpenForm: () => {
      dispatch(actions.openForm())
    },
    onEditTask: (task) => {
      dispatch(actions.editTask(task))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);