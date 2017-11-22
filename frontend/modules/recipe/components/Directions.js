import React from 'react'
import PropTypes from 'prop-types'

const Directions = ({ data }) => {
  let directions = data.map(function(direction) {
    return (
      <li className="direction" key={ direction.step }>
        { direction.title }
      </li>
    );
  });

  return (
    <ol className="directions" >
      { directions }
    </ol>
  );
};

Directions.PropTypes = {
  data: PropTypes.shape({
    step: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired
};

export default Directions;
