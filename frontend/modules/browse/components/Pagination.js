import React from 'react'

export default React.createClass ({

  _onClick: function (event) {
    event.preventDefault();
    if(this.props.filter) {
      this.props.filter('offset', parseInt(event.target.name));
    }
  },

  render: function() {
    var offset = this.props.offset ? parseInt(this.props.offset) : 0;
    var limit = this.props.limit ? parseInt(this.props.limit) : 0;
    var count = this.props.count ? parseInt(this.props.count) : 0;
    var next = offset + limit;
    var previous = offset - limit;

    return (
      <ul className="pager">
        <li className="previous">
          { (previous >= 0) ?
            <a href="#"
               name={ previous }
               onClick={ this._onClick }>
              &larr; Newer
            </a>
            : ''
          }
        </li>
        <li className="next">
          { (next < count) ?
            <a href="#"
               name={ next }
               onClick={ this._onClick }>
               Older &rarr;
            </a>
            : ''
          }
        </li>
      </ul>
    );
  }
})