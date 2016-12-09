import React from 'react'

export var Input = React.createClass({
  getInitialState: function() {
    return {value: this.props.value || ''};
  },
  handleChange(event) {
    this.setState({value: event.target.value});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
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

export var TextArea = React.createClass({
  getInitialState: function() {
    return { value: this.props.value || '' };
  },
  handleChange(event) {
    this.setState({value: event.target.value});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  },
  render: function () {
    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="form-group">
          {this.props.label ? <label>{this.props.label}</label> : null}
          <textarea type={this.props.type}
                    name={this.props.name}
                    rows={this.props.rows}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this.handleChange}/>
        </div>
      </div>
    )
  }
});

export var File = React.createClass({
  getInitialState: function() {
    return {value: this.props.value || ''};
  },
  handleChange(event) {
    this.setState({value: event.target.files[0]});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.files[0]);
    }
  },
  render: function () {
    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="form-group">
          {this.props.label ? <label>{this.props.label}</label> : null}
          <input type="file"
                 name={this.props.name}
                 onChange={this.handleChange}/>
          <p className="help-block">Please upload a picture of the finished recipe!</p>
        </div>
      </div>
    )
  }
});

export var Checkbox = React.createClass({
  getInitialState: function() {
    return {checked: this.props.checked || true};
  },
  handleChange(event) {
    var new_value = !this.state.checked === true ? 1 : 0;
    this.setState({checked: new_value});
    if(this.props.change) {
      this.props.change(event.target.name, new_value);
    }
  },
  render: function () {
    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="checkbox">
          <label>
            <input type="checkbox"
                   name={this.props.name}
                   checked={this.state.checked}
                   onChange={this.handleChange}/>
            {this.props.placeholder}
          </label>
        </div>
      </div>
    )
  }
});

export var Select = React.createClass({
  getInitialState: function() {
    return { value: this.props.value || '' };
  },
  handleChange(event) {
    this.setState({value: event.target.value});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  },
  render: function () {
    var options = this.props.data.map(function(option) {
      return (
        <option key={option.id} value={option.id}>{option.title}</option>
      );
    });
    return (
      <div className={this.props.size} key={this.props.id}>
        <div className="form-group">
          {this.props.label ? <label>{this.props.label}</label> : null}
          <select name={this.props.name}
                  className="form-control"
                  value={this.state.value}
                  onChange={this.handleChange}>
            <option key={0} value="">Please select a {this.props.label}</option>
            { options }
          </select>
        </div>
      </div>
    )
  }
});

export var Alert = React.createClass({
  render: function() {
    return (
      <div className="alert alert-danger">
        <strong>Form Error!</strong> Please confirm that all the data is there.
      </div>
    )
  }
});
