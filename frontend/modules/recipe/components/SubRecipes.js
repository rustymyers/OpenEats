import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Checkbox } from '../../common/components/FormComponents'

const SubRecipes = ({ data, check }) => {
  let recipeLinks = data.map((recipeLink, i) => {
    let quantity = recipeLink.customQuantity ? recipeLink.customQuantity : recipeLink.quantity;
    return (
      <li className="ingredient" key={ i }>
        <Checkbox
          name={ recipeLink.child_recipe_id }
          checked={ recipeLink.checked ? recipeLink.checked : false }
          change={ check }
        />
        { (recipeLink.quantity !== 0)
            ? <span className="quantity">{ quantity } </span>
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
  });

  return (
    <ul className="ingredients" >
      { recipeLinks }
    </ul>
  );
};

SubRecipes.PropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    child_recipe_id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    measurement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired
};

export default SubRecipes;
