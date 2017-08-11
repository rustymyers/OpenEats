import React from 'react'
import { Link } from 'react-router'

class SubRecipes extends React.Component {
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
    let recipeLinks = this.state.data.map(function(recipeLink) {
      return (
        <li className="ingredient" key={ recipeLink.child_recipe_id }>
          { (recipeLink.quantity !== 0)
              ? <span className="quantity">{ recipeLink.quantity } </span>
              : null
          }
          { (recipeLink.measurement)
              ? <span className="measurement">{ recipeLink.measurement } </span>
              : null
          }
          { (recipeLink.title)
              ? <Link to={ "/recipe/" + recipeLink.child_recipe_id } className="title">{ recipeLink.title }</Link>
              : null
          }
        </li>
      );
    }, this);

    return (
      <ul className="ingredients" >
        { recipeLinks }
      </ul>
    );
  }
}

module.exports = SubRecipes;
