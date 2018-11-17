import React, { Component } from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
  }

  
  componentWillMount() {
    if (this.props.taskEditing) {
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.taskEditing) {
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status
      });
    } else if (!nextProps.taskEditing) {
      this.setState({
        id: '',
        name: '',
        status: false
      });
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
    this.props.onSubmit(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    });
  }

  render() {
    var {id} = this.state;
    return (
      <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">
              {id !== '' ? 'Update Job' : 'Add New Job'}
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
                  type="reset" 
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

export default TaskForm;