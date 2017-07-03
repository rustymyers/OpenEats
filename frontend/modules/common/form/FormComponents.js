import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';


class BaseComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      errors: this.props.errors || false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });

    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  }

  hasErrors() {
    return this.state.errors !== false;
  }

  getErrorMessage() {
    if (this.hasErrors()) {
      return (
          <span className="help-inline">{ this.state.errors[0] }</span>
      );
    }

    return null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }

    if ('errors' in nextProps) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
}

class Input extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{this.props.label}</label> : null }
          <input type={ this.props.type }
                 name={ this.props.name }
                 className="form-control"
                 placeholder={ this.props.placeholder }
                 value={ this.state.value }
                 onChange={ this.handleChange }/>
          { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}

class TextArea extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{this.props.label}</label> : null }
          <textarea type={ this.props.type }
                    name={ this.props.name }
                    rows={ this.props.rows }
                    className="form-control"
                    placeholder={ this.props.placeholder }
                    value={ this.state.value }
                    onChange={ this.handleChange }/>
          { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}

class File extends BaseComponent {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    this.setState({
      value: event.target.files[0]
    });

    if(this.props.change) {
      this.props.change(event.target.name, event.target.files[0]);
    }
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      help_block: {
        id: 'file_widget.help_block',
        description: 'File upload widget help message',
        defaultMessage: 'Please upload a picture of the finished recipe!',
      }
    });

    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className="form-group">
          { this.props.label ? <label>{this.props.label}</label> : null }
          <input type="file"
                 name={ this.props.name }
                 accept={ this.props.accept }
                 onChange={ this.handleChange }/>
          <p className="help-block">{ formatMessage(messages.help_block) }</p>
        </div>
      </div>
    )
  }
}

class Checkbox extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.props.checked || true
    };
  }

  handleChange(event) {
    this.setState({
      checked: this.state.checked === true ? 1 : 0
    });

    if(this.props.change) {
      this.props.change(event.target.name, new_value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checked != nextProps.checked) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  render() {
    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className="checkbox">
          <label>
            <input type="checkbox"
                   name={ this.props.name }
                   checked={ this.state.checked }
                   onChange={ this.handleChange }/>
            { this.props.placeholder }
          </label>
        </div>
      </div>
    )
  }
}

class Select extends BaseComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const options = this.props.data.map(function(option) {
      return (
        <option key={ option.id } value={ option.id }>{option.title}</option>
      );
    });

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      header: {
        id: 'select_widget.header',
        description: 'Select widget default message',
        defaultMessage: 'Please select a {label}',
      }
    });

    return (
      <div className={ this.props.size } key={ this.props.id }>
        <div className={ "form-group " + (this.hasErrors() ? 'has-error' : null) }>
          { this.props.label ? <label>{ this.props.label }</label> : null }
          <select name={ this.props.name }
                  className="form-control"
                  value={ this.state.value }
                  onChange={ this.handleChange }>
            <option key={0} value="">{ formatMessage(messages.header, { label: this.props.label }) }</option>
            { options }
          </select>
          { this.getErrorMessage() }
        </div>
      </div>
    )
  }
}

class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      title: {
        id: 'widget_error.title',
        description: 'Form error title',
        defaultMessage: 'Form error!',
      },
      message: {
        id: 'widget_error.message',
        description: 'Form error message',
        defaultMessage: 'Please confirm that all the data is there.',
      }
    });

    return (
      <div className="alert alert-danger">
        <strong>{ formatMessage(messages.title) }</strong> { formatMessage(messages.message) }
      </div>
    )
  }
}

module.exports.Input = Input;
module.exports.TextArea = TextArea;
module.exports.File = injectIntl(File);
module.exports.Checkbox = Checkbox;
module.exports.Select = injectIntl(Select);
module.exports.Alert = injectIntl(Alert);