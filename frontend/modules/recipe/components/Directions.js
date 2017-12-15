import React from 'react'

class Directions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data || []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  render() {
    let directions = this.state.data.map(function(direction) {
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
}

module.exports = Directions;
