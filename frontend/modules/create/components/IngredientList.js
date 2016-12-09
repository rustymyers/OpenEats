import React from 'react'
import {Input} from './FormComponents'
import {Auto} from './Auto'
import {measurements} from '../../common/config'

var Ingredient = React.createClass({
  getInitialState: function() {
    return {title: '', quantity: '', measurement: ''};
  },
  update: function(name, value) {
    this.setState({[name]: value});
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (nextProps.change) {
      nextProps.change(nextProps.id, nextState);
    }
  },
  render: function () {
    return (
      <div className="ingredient" key={this.props.id}>
        <Input name="title" type="text" label="Name" placeholder="Name" size="col-xs-4" change={this.update}/>
        <Input name="quantity" type="number" label="Quantity" placeholder="Quantity" size="col-xs-4" change={this.update}/>
        <Auto name="measurement" data={measurements} type="text" label="Measurement" placeholder="Measurement" size="col-xs-4" change={this.update}/>
      </div>
    )
  }
});

export default React.createClass({
  getInitialState: function () {
    return { ingredients: [<Ingredient key="0" id="0" change={this.updateData}/>], data: [] };
  },
  addIngredient: function (e) {
    e.preventDefault();
    var ingredients = this.state.ingredients;
    ingredients.push(<Ingredient key={ingredients.length} id={ingredients.length} change={this.updateData} />);
    this.setState({ ingredients: ingredients });
  },
  updateData: function (id, data) {
    var ingredients = this.state.data;
    ingredients[id] = data;
    this.setState({data: ingredients});
    if (this.props.change) {
      this.props.change(this.props.name, ingredients);
    }
  },
  render: function () {
    return (
      <div className="row">
        {this.props.label ? <label className="col-xs-12">{this.props.label}</label> : null}
        <div className="col-xs-12">
          <div className="panel panel-default">
            <div className="panel-body">
              {this.state.ingredients}
              <a href="#" onClick={this.addIngredient} className="btn btn-success add-ing">Add Ingredient</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
