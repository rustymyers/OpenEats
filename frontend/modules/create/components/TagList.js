import React from 'react'
import {measurements} from '../../common/config'

export default React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value || '',
      comp_value: this.arrayify(this.props.value)
    };
  },

  arrayify(value) {
    var dict = [];
    if (value) {
      var tags = value.split(',');
      for (let title in tags) {
        dict.push({'title': tags[title]})
      }
    }
    return dict
  },

  handleChange(event) {
    this.setState({
      value: event.target.value,
      comp_value: this.arrayify(event.target.value)
    });
    if(this.props.change) {
      this.props.change(event.target.name, this.arrayify(event.target.value));
    }
  },

  render: function () {
    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="form-group">
          {this.props.label ? <label>{this.props.label}</label> : null}
          <input type={this.props.type}
                 name={this.props.name}
                 className="form-control"
                 placeholder={this.props.placeholder}
                 value={this.state.value}
                 onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
});
