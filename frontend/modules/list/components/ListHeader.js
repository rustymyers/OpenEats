import React from 'react'
import classNames from 'classnames'

import {
  ENTER_KEY,
  ESCAPE_KEY
} from '../constants/ListStatus'

export default React.createClass({
  getInitialState: function() {
    return {
      title: this.props.title || '',
      editing: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      editing: false,
    });
  },

  delete_list: function () {
    if (confirm("Are you sure you want to delete this list?")) {
      this.props.removeList()
    }
  },

  handleEdit: function () {
    this.setState({editing: true});
  },

  handleChange: function (event) {
    if (this.state.editing) {
      this.setState({title: event.target.value});
    }
  },

  handleKeyDown: function (event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({
        title: this.props.title,
        editing: false,
      });
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  },

  handleSubmit: function (event) {
    var val = this.state.title.trim();
    if (val) {
      this.props.updateList(val);
      this.setState({
        editText: val,
        editing: false,
      });
    } else {
      this.setState({
        editText: this.props.title,
        editing: false,
      });
    }
  },

  render: function() {
    return (
      <div className={classNames({
          editing: this.state.editing,
          "list-header": true
        })}>
        <div className="view">
          <label onDoubleClick={this.handleEdit}>
            { this.state.title }
          </label>
          <button className="destroy" onClick={this.delete_list} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={ this.state.title  }
          onBlur={ this.handleSubmit }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
        />
      </div>
    )
  }
});
