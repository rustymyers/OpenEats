import React from 'react'
import Ingredients from './Ingredients'

class IngredientGroups extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  render() {
    let ingredientGroups = this.state.data.map(function(ingredientGroup) {
      return (
      <div className="ingredient-group" key={ ingredientGroup.title }>
        { (ingredientGroup.title)
          ? <b>{ ingredientGroup.title }</b>
          : null
        }
        <Ingredients data={ ingredientGroup.ingredients }/>
      </div>
      );
    }, this);

    return (
      <div className="ingredient-groups">
        { ingredientGroups }
      </div>
    );
  }
}

module.exports = IngredientGroups;
