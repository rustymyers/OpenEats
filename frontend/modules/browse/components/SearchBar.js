import React from 'react'

export default React.createClass({

  getInitialState: function() {
    return { value: this.props.value || '' };
  },

  _onChange(event) {
    this.setState({ value: event.target.value });
    if(this.props.filter) {
      this.props.filter('search', event.target.value);
    }
  },

  render: function() {
    return (
      <div className={ this.props.format }>
        <div className="input-group search-bar">
          <span className="input-group-addon" id="search_bar_label">Search for Recipes:</span>
          <input type="text"
                 name="SearchBar"
                 aria-describedby="search_bar_label"
                 className="form-control"
                 placeholder="Enter a title, tag, or ingredient"
                 value={ this.state.value }
                 onChange={ this._onChange }/>
        </div>
      </div>
    )
  }
});