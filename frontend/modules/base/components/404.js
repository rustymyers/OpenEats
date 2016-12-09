import React from 'react'

require("../css/404.scss");

export default React.createClass({
  render: function() {
    return (
      <div className="not-found">
        <h3>Our chef's ruined this recipe in the test kitchen, we suggest you try something else</h3>
        <img className="img-responsive" src="/images/404.png" alt="404 image"/>
        <p>Sorry the page came back with a 404 error we can't find what you are looking for</p>
      </div>
    );
  }
});
