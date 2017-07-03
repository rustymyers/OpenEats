import React from 'react'

export default React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data || []
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  },

  render: function() {
    var directions = this.state.data.map(function(direction) {
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
  }
});
