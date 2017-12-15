import React from 'react'

class Ingredients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || []
    };

    this.round = this.round.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  round(number, precision) {
    let factor = Math.pow(10, precision);
    let tempNumber = number * factor;
    let roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  render() {
    let ingredients = this.state.data.map(function(ingredient) {
      let quantity = this.round(ingredient.quantity, 3);

      return (
        <li className="ingredient" key={ ingredient.id }>
          { (ingredient.quantity !== 0)
              ? <span className="quantity">{ quantity } </span>
              : null
          }
          { (ingredient.measurement)
              ? <span className="measurement">{ ingredient.measurement } </span>
              : null
          }
          { (ingredient.title)
              ? <span className="title">{ ingredient.title }</span>
              : null
          }
        </li>
      );
    }, this);

    return (
      <ul className="ingredients" >
        { ingredients }
      </ul>
    );
  }
}

module.exports = Ingredients;
