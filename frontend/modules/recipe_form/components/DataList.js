import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl'

import { Direction, Ingredient } from './DataListItem'

class DataList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || [],
      errors: this.props.errors || false
    };

    this.addData = this.addData.bind(this);
  }

  addData(e) {
    e.preventDefault();
    let data = this.state.data;
    data.push({
      step: data.length === 0 ? 1 : (data[data.length - 1].step + 1),
      title: ''
    });
    this.setState({ data: data });

    if (this.props.change) {
      this.props.change(this.props.name, this.state.data);
    }
  }

  deleteData(e, key) {
    e.preventDefault();

    let data = this.state.data;
    data.splice(key, 1);

    this.setState({
      data: data
    });

    if (this.props.change) {
      this.props.change(this.props.name, data);
    }
  }

  updateData(key, name, value) {
    if (value != this.state.data[key][name]) {
      this.state.data[key][name] = value;
      this.setState({
        data: this.state.data
      });

      if (this.props.change) {
        this.props.change(this.props.name, this.state.data);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      this.setState({
        data: nextProps.data
      });
    }

    if('errors' in nextProps) {
      this.setState({errors: nextProps.errors});
    }
  }

  getDataList() {
    return null;
  }

  getMessages() {
    return null;
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = this.getMessages();

    let panelClass = "panel panel-default";
    let errorMessage = false;
    if (this.state.errors !== false) {
      panelClass = "panel panel-danger";
      errorMessage = (
        <div className="panel-footer">
          { this.state.errors[0] }
        </div>
      )
    }

    return (
      <div className="row">
        { this.props.label ? <label className="col-xs-12">{ this.props.label }</label> : null }
        <div className="col-xs-12">
          <div className={ panelClass }>
            <div className="panel-body">
              { this.getDataList() }
              <a href="#" onClick={ this.addData } className="btn btn-success add-ing">{ formatMessage(messages.next_data) }</a>
            </div>
            { errorMessage }
          </div>
        </div>
      </div>
    )
  }
}

class DirectionList extends DataList {
  constructor(props) {
    super(props);
  }

  getDataList() {
    return this.state.data.map((data, key) => {
      return (
        <Direction 
          key={ key.toString() + '-' + this.state.data.length.toString() }
          id={ key }
          data={ data }
          change={ (name, value) => { this.updateData(key, name, value); } }
          deleteData={ (e) => { this.deleteData(e, key) } }/>
        )
    });
  }

  deleteData(e, key) {
    e.preventDefault();

    let data = this.state.data;
    data.splice(key, 1);
    data = data.map((i, k) => { return {step: k + 1, title: i.title};});

    this.setState({
      data: data
    });

    if (this.props.change) {
      this.props.change(this.props.name, data);
    }
  }

  getMessages() {
    return defineMessages({
      next_data: {
        id: 'directions.next_direction',
        description: 'Next direction button text',
        defaultMessage: 'Next direction',
      }
    });
  }
}

class IngredientList extends DataList {
  constructor(props) {
    super(props);
  }

  getDataList() {
    return this.state.data.map((data, key) => {
      return (
        <Ingredient
          key={ key.toString() + '-' + this.state.data.length.toString() }
          id={ key }
          data={ data }
          change={(name, value) => { this.updateData(key, name, value); } }
          deleteData={(e) => { this.deleteData(e, key) }}/>
      )
    });
  }

  getMessages() {
    return defineMessages({
      next_data: {
        id: 'ingredients.add_ingredient',
        description: 'Add ingredient button',
        defaultMessage: 'Add ingredient',
      }
    });
  }
}

module.exports.DirectionList = injectIntl(DirectionList);
module.exports.IngredientList = injectIntl(IngredientList);