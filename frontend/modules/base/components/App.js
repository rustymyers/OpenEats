import React from 'react'

import Nav from './Nav'

export default React.createClass({
  render: function() {
    return (
      <div className="react">
        <Nav />
        {this.props.children}
      </div>
    );
  }
});
