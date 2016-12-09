import React from 'react'
import Autocomplete from 'react-autocomplete';

export var Auto = React.createClass({
  getInitialState: function() {
    return {
      val: this.props.value || '',
      data: this.props.data || '',
    };
  },

  handleChange(event) {
    this.setState({val: event.target.value});
    if(this.props.change) {
      this.props.change(event.target.name, event.target.value);
    }
  },

  handleSelect(value) {
    this.setState({val: value});
    if(this.props.change) {
      this.props.change(this.props.name, value);
    }
  },

  matchStateToTerm (state, value) {
    return (
      state.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  },

  sortStates (a, b, value) {
    return (
      a.toLowerCase().indexOf(value.toLowerCase()) >
      b.toLowerCase().indexOf(value.toLowerCase()) ? 1 : -1
    )
  },

  renderItems (items) {
    return items.map((item) => {
      return item
    })
  },

  render: function () {
    return (
      <div className={this.props.size} key={this.props.id}>
        {this.props.label ? <label>{this.props.label}</label> : null}
        <Autocomplete
          wrapperProps={{className: "form-group autocomplete", }}
          wrapperStyle={{}}
          value={this.state.val}
          inputProps={{name: this.props.name, className: "form-control", placeholder: this.props.placeholder}}
          items={this.state.data}
          getItemValue={(item) => item}
          shouldItemRender={this.matchStateToTerm}
          sortItems={this.sortStates}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          renderItem={(item, isHighlighted) => (
            <div
              className={isHighlighted ? 'item highlightedItem' : 'item'}
              key={item}
            >{item}</div>
          )}
          renderMenu={(items, value) => (
            <div className="menu">
                { this.state.loading ? (
                  <div className="item">Loading...</div>
                ) : items.length === 0 ? (
                  <div className="item">No matches for {value}</div>
                ) : this.renderItems(items)}
              </div>
          )}
        />
      </div>
    )
  }
});
