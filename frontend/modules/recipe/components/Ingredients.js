import React from 'react'

export default React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data || []
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  },

  render: function() {
    var ingredients = this.state.data.map(function(ingredient) {
      return (
        <li className="ingredient" key={ ingredient.id }>
          { (ingredient.quantity !== 0)
              ? <span className="quantity">{ ingredient.quantity } </span>
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
    });
    return (
      <ul className="ingredients" >
        { ingredients }
      </ul>
    );
  }
});
