import React, { Component } from 'react';

class TaskSort extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sort: {
        by: 'name',
        value: 1
      }
    };
  }
  

  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue
      }
    }, () => {
      this.props.onSort(this.state.sort);
    });
  }

  render() {
    var {sort} = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" id="orderBy" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Order By &nbsp;
            <i className="fa fa-caret-square-o-down" aria-hidden="true"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby="orderBy">
            <li onClick={ () => this.onSort('name', 1) }>
              <p
                role="button" 
                className={(sort.by === 'name' && sort.value === 1) ? 'sort-selected' : ''}
              >
                <i className="fa fa-sort-alpha-asc" aria-hidden="true"></i> Name A-Z
              </p>
            </li>
            <li onClick={ () => this.onSort('name', -1) }>
              <p
                role="button" 
                className={(sort.by === 'name' && sort.value === -1) ? 'sort-selected' : ''}
              >
                <i className="fa fa-sort-alpha-desc" aria-hidden="true"></i> Name Z-A
              </p>
            </li>
            <li role="separator" className="divider"></li>
            <li onClick={ () => this.onSort('status', 1) }>
              <p
                role="button" 
                className={(sort.by === 'status' && sort.value === 1) ? 'sort-selected' : ''}
              >
              <i className="fa fa-toggle-on" aria-hidden="true"></i> Enable
              </p>
            </li>
            <li onClick={ () => this.onSort('status', -1) }>
              <p
                role="button" 
                className={(sort.by === 'status' && sort.value === -1) ? 'sort-selected' : ''}
              >
              <i className="fa fa-toggle-off" aria-hidden="true"></i> Disable
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TaskSort;