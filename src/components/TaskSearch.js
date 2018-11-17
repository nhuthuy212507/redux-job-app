import React, { Component } from 'react';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };
  }
  
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }

  onSearch = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.keyword);
  }

  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div className="input-group">
          <input 
            type="text" 
            name="keyword"
            className="form-control" 
            placeholder="Enter keyword"
            onChange={this.onChange}
          />
          <span className="input-group-btn">
            <button 
              className="btn btn-primary" 
              type="button"
              onClick={this.onSearch}
            ><i className="fa fa-search" aria-hidden="true"></i> Search</button>
          </span>
        </div>
      </div>
    );
  }
}

export default Search;