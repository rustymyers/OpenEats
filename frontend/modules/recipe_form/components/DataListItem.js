import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl'

import RecipeActions from '../actions/RecipeActions'
import { TextArea, Input } from '../../common/form/FormComponents'
import Auto from './Auto'
import { measurements } from '../../common/config'

class Direction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: this.props.data ? this.props.data.step : 0,
      title: this.props.data ? this.props.data.title : ''
    };

    this.update = this.update.bind(this);
  }

  update(name, value) {
    this.setState({ [name]: value });
    if(this.props.change) {
      this.props.change(name, value);
    }
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      step_label: {
        id: 'directions.step_label',
        description: 'Step # label',
        defaultMessage: 'Step {step, number}',
      },
      textarea_placeholder: {
        id: 'directions.textarea_placeholder',
        description: 'Step # label',
        defaultMessage: 'Direction',
      }
    });

    return (
      <div className="direction row">
        <label className="col-sm-1 hidden-xs">
          { formatMessage(messages.step_label, {step: this.state.step}) }:
        </label>
        <label className="col-sm-1 visible-xs">
          { this.state.step }:
        </label>
        <TextArea
          name="title"
          type="text"
          placeholder={ formatMessage(messages.textarea_placeholder) }
          size="col-sm-10 col-xs-9"
          change={ this.update }
          value={ this.state.title }/>
        <div className="col-sm-1 col-xs-2">
          <div className="form-group">
            <button onClick={ this.props.deleteData } className="btn btn-danger glyphicon glyphicon-remove" />
          </div>
        </div>
      </div>
    )
  }
}

class Ingredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.data ? this.props.data.title : '',
      quantity: this.props.data ? this.props.data.quantity : 0, 
      measurement: this.props.data ? this.props.data.measurement : '',
      group: this.props.data ? this.props.data.group : ''
    };

    this.update = this.update.bind(this);
  }

  update(name, value) {
    this.setState({ [name]: value });
    if(this.props.change) {
      this.props.change(name, value);
    }
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      name_placeholder: {
        id: 'ingredients.name_placeholder',
        description: 'Ingredients name placeholder',
        defaultMessage: 'Name',
      },
      quantity_placeholder: {
        id: 'ingredients.quantity_placeholder',
        description: 'Ingredients quantity placeholder',
        defaultMessage: 'Quantity',
      },
      measurement_placeholder: {
        id: 'ingredients.measurement_placeholder',
        description: 'Ingredients measurement placeholder',
        defaultMessage: 'Measurement',
      },
      group_placeholder: {
        id: 'ingredients.group_placeholder',
        description: 'Ingredients group placeholder',
        defaultMessage: 'Group (leave blank for default)',
      }
    });

    return (
      <div className="ingredient" key={this.props.id}>
        <Input
          name="group"
          type="text"
          placeholder={ formatMessage(messages.group_placeholder) }
          size="col-sm-3 col-xs-12"
          change={ this.update }
          value={ this.state.group }
        />
        <Input
          name="quantity"
          type="number"
          placeholder={ formatMessage(messages.quantity_placeholder) }
          size="col-sm-2 col-xs-12"
          change={ this.update }
          value={ this.state.quantity }
        />
        <Auto
          name="measurement"
          data={ measurements }
          type="text"
          placeholder={ formatMessage(messages.measurement_placeholder) }
          size="col-sm-3 col-xs-12"
          change={ this.update }
          value={ this.state.measurement }
        />
        <Input
          name="title"
          type="text"
          placeholder={ formatMessage(messages.name_placeholder) }
          size="col-sm-3 col-xs-12"
          change={ this.update }
          value={ this.state.title }
        />
        <div className="col-xs-1">
          <div className="form-group">
            <button onClick={ this.props.deleteData } className="btn btn-danger glyphicon glyphicon-remove" />
          </div>
        </div>
      </div>
    )
  }
}

class SubRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipeList: this.props.recipeList ? this.props.recipeList : [],
      title: this.props.data ? this.props.data.title : '',
      quantity: this.props.data ? this.props.data.quantity : 0,
      measurement: this.props.data ? this.props.data.measurement : '',
    };

    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ recipeList: nextProps.recipeList })
  }

  update(name, value) {
    if (name === 'title') {
      RecipeActions.fetchRecipeList(value)
    }

    this.setState({ [name]: value });
    if(this.props.change) {
      this.props.change(name, value);
    }
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      name_placeholder: {
        id: 'subrecipe.name_placeholder',
        description: 'Ingredients name placeholder',
        defaultMessage: 'Name',
      },
      quantity_placeholder: {
        id: 'subrecipe.quantity_placeholder',
        description: 'Ingredients quantity placeholder',
        defaultMessage: 'Quantity',
      },
      measurement_placeholder: {
        id: 'subrecipe.measurement_placeholder',
        description: 'Ingredients measurement placeholder',
        defaultMessage: 'Measurement',
      }
    });

    return (
      <div className="ingredient" key={this.props.id}>
        <Input
          name="quantity"
          type="number"
          placeholder={ formatMessage(messages.quantity_placeholder) }
          size="col-sm-3 col-xs-12"
          change={ this.update }
          value={ this.state.quantity }
        />
        <Auto
          name="measurement"
          data={ measurements }
          type="text"
          placeholder={ formatMessage(messages.measurement_placeholder) }
          size="col-sm-4 col-xs-12"
          change={ this.update }
          value={ this.state.measurement }
        />
        <Auto
          name="title"
          type="text"
          placeholder={ formatMessage(messages.name_placeholder) }
          size="col-sm-4 col-xs-12"
          change={ this.update }
          value={ this.state.title }
          allowFilter={ false }
          data={ this.state.recipeList }
        />
        <div className="col-xs-1">
          <div className="form-group">
            <button onClick={ this.props.deleteData } className="btn btn-danger glyphicon glyphicon-remove" />
          </div>
        </div>
      </div>
    )
  }
}

module.exports.Direction = injectIntl(Direction);
module.exports.Ingredient = injectIntl(Ingredient);
module.exports.SubRecipe = injectIntl(SubRecipe);