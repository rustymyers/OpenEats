import React from 'react'

export default React.createClass({

  _onClick: function (event) {
    event.preventDefault();
    if(this.props.filter) {
      this.props.filter(this.props.title, event.target.name);
    }
  },

  render: function() {
    var _onClick = this._onClick;
    var active = this.props.active;
    var items = this.props.data.map(function(item) {
      var classNames = "list-group-item";
      if (item.title == active) {
        classNames += " active";
      }
      return (
        <a className={ classNames }
           href="#"
           key={ item.id }
           name={ item.title }
           onClick={ _onClick }>
          { item.title }
        </a>
      );
    });
    return (
      <div className="list-group">
         <p className="list-group-item disabled">
           <b>Filter { this.props.title }</b>
         </p>
        { items }
        { active ?
          <a className="list-group-item"
             href="#"
             name={ '' }
             key={ 9999999999999999 }
             onClick={ _onClick }>
            Clear Filter
          </a>
          : ''
        }
      </div>
    );
  }
});
