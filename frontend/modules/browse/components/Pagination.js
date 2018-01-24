import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Pagination = ({ offset, limit, count, buildUrl }) => {
  offset = offset ? parseInt(offset) : 0;
  limit = limit ? parseInt(limit) : 0;
  count = count ? parseInt(count) : 0;
  let next = offset + limit;
  let previous = offset - limit;

  const link = (title, offset, key, active) => (
    <li className={classNames({"page-item": true, "active": active})} key={ key }>
      <Link className="page-link" to={ buildUrl('offset', offset) }>
        { title }
      </Link>
    </li>
  );

  const numbers = (offset, limit, count) => {
    let numbers = [];

    const min = 2, max = 5;
    // Make sure we start at the min value
    let start = offset - min < 1 ? 1 : offset - min;
    // Make sure we start at the max value
    start = start > count/limit-max ? count/limit-max : start;
    // Only show data if we have results
    start = start < 1 ? 1 : start;

    for (let i = start; i < count/limit && i < max + start; i++) {
      numbers.push(link(i+1, limit*i, i+1, offset==limit*i))
    }
    return numbers
  };

  return (
    <div className="text-center">
      <ul className="pagination">
        { (previous >= 0) ? link('←', previous, 'previous') : '' }
        { link('1', 0, 'first', offset==0) }
        { numbers(offset, limit, count) }
        { (next < count) ? link('→', next, 'next') : '' }
      </ul>
    </div>
  )
};

Pagination.propTypes = {
  buildUrl: PropTypes.func.isRequired
};

export default Pagination;
