import React from 'react'

require("./../css/ratings.scss");

export default React.createClass({
  render: function() {
    var tmp = '......';
    var start_map = tmp.split(".", this.props.stars);
    var empty_star_map = tmp.split(".", 5 - this.props.stars);
    var stars = start_map.map(function(name, index){
      return <span key={ index } className="glyphicon glyphicon-star"/>;
    });
    var empty_stars = empty_star_map.map(function(name, index){
      return <span key={ index } className="glyphicon glyphicon-star-empty"/>;
    });
    return (
      <p className="rating-stars">
        {stars}
        {empty_stars}
      </p>
    );
  }
});
