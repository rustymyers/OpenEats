import React from 'react'

require("./../css/ratings.scss");

export default React.createClass({
  render: function() {
    let stars = this.props.stars ? this.props.stars : 0;
    if (stars > 5) {
      stars = 5;
    } else if (stars < 0) {
      stars = 0;
    }

    const full_stars = [...Array(stars).keys()].map(function(name, index) {
      return <span key={ index } className="glyphicon glyphicon-star"/>;
    });
    const empty_stars = [...Array(5 - stars).keys()].map(function(name, index) {
      return <span key={ index } className="glyphicon glyphicon-star-empty"/>;
    });

    return (
      <p className="rating-stars">
        { full_stars }
        { empty_stars }
      </p>
    );
  }
});
