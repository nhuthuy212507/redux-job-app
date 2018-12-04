import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  componentWillMount() {
    if (this.props.taskEditing) {
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status
      });
    } else {
      this.onClear();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEditing) {
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status
      });
    } else {
      this.onClear();
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSaveTask(this.state);
    this.onClear();
    this.props.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    });
  }

  render() {
    var { taskEditing } = this.props;
    if (!this.props.isDisplayForm) return '';
    return (
      <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">
              {taskEditing.id !== '' ? 'Update Job' : 'Add New Job'}
              <i 
                className="fa fa-times-circle pull-right" 
                aria-hidden="true"
                onClick={this.onCloseForm}
              ></i>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select 
                  className="form-control"
                  name="status" 
                  value={this.state.status}
                  onChange={this.onChange}
                >
                  <option value={true}>Enable</option>
                  <option value={false}>Disable</option>
                </select>
              </div>
              <div className="form-group text-center">
                <button type="submit" className="btn btn-success"><i className="fa fa-plus" aria-hidden="true"></i> Save</button>&nbsp;
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={this.onClear}
                ><i className="fa fa-times" aria-hidden="true"></i> Cancel</button>
              </div>
            </form>
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
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () => {
      return dispatch(actions.closeForm());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);