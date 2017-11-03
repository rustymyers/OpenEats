import React from 'react'
import PropTypes from 'prop-types'

import { Checkbox } from '../../common/form/FormComponents'

const Ingredients = ({ data, check }) => {
  let ingredients = data.map(function(ingredient) {
    let quantity = ingredient.customQuantity ? ingredient.customQuantity : ingredient.quantity;
    return (
      <li className="ingredient" key={ ingredient.id }>
        <Checkbox
          name={ ingredient.id }
          checked={ ingredient.checked ? ingredient.checked : false }
          change={ check }
        />
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
  });

  return (
    <ul className="ingredients" >
      { ingredients }
    </ul>
  );
};

Ingredients.PropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    measurement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired
};

export default Ingredients;
