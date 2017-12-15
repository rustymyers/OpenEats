import React from 'react'
import { Link } from 'react-router'
import { injectIntl, defineMessages } from 'react-intl'

export default injectIntl(React.createClass({
  render: function () {
    const { formatMessage } = this.props.intl;
    const messages = defineMessages({
      no_lists: {
        id: 'my_lists.no_lists',
        description: 'No Lists to display',
        defaultMessage: 'No Lists to display',
      },
      new_list: {
        id: 'my_lists.new_list',
        description: 'Create a New List!',
        defaultMessage: 'Create a New List!',
      },
    });

    if (this.props.data == null || this.props.data.length == 0) {
      return (
        <div className="grocery-lists">
        <ul className="list-group">
          <a href="#" className="list-group-item disabled">
            { this.props.title }
          </a>
          <a href="#" className="list-group-item disabled">
            { formatMessage(messages.no_lists) }
          </a>
        </ul>
      </div>
      );
    }

    var items = this.props.data.map(function(item) {
      var link = '/list/' + item.id;
      return (
        <Link to={ link } className="list-group-item" activeClassName="active" key={ item.id }>
          <span className="badge">{ item.item_count }</span>
          { item.title }
        </Link>
      );
    });

    return (
      <div className="grocery-lists">
        <ul className="list-group">
          <a href="#" className="list-group-item disabled">
            { this.props.title }
          </a>
          { items }
          <Link to={ '/list/' } className="list-group-item">
            { formatMessage(messages.new_list) }
          </Link>
        </ul>
      </div>
    );
  }
}));
