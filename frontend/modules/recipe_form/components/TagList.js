import React from 'react'

class TagList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: this.props.tags || [],
      input: this.unarrayify(this.props.tags || []),
      errors: this.props.errors || false,
    };
  }

  unarrayify = value => {
    return value.map((tag, key) => {
      return tag.title
    }).join(', ');
  };

  arrayify = value => {
    let dict = [];
    if (value) {
      let tags = value.split(',');
      for (let title in tags) {
        dict.push({'title': tags[title].trim()})
      }
    }
    return dict
  };

  handleChange = event => {
    this.setState({
      tags: this.arrayify(event.target.value),
      input: event.target.value
    });

    if(this.props.change) {
      this.props.change(event.target.name, this.arrayify(event.target.value));
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.tags === undefined && this.props.tags != nextProps.tags) {
      this.setState({
        tags: nextProps.tags,
        input: this.unarrayify(nextProps.tags)
      });
    }

    if ('errors' in nextProps) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    let className = "form-group";
    let errorMessage = false;
    if (this.state.errors !== false) {
      className += " has-error";
      errorMessage = (
        <span className="help-inline">{ this.state.errors[0] }</span>
      )
    }

    return (
      <div className={this.props.size} key={this.props.id}>
        <div className={ className }>
          {this.props.label ? <label>{this.props.label}</label> : null}
          <input type={this.props.type}
                 name={this.props.name}
                 className="form-control"
                 placeholder={this.props.placeholder}
                 value={this.state.input}
                 onChange={this.handleChange}
                 />
          { errorMessage }
        </div>
      </div>
    )
  }
}

export default TagList
