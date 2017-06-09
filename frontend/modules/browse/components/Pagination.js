import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

class Pagination extends React.Component {
    constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  _onClick(event) {
    event.preventDefault();
    if (this.props.filter) {
      this.props.filter('offset', parseInt(event.target.name));
    }
  }

  render() {
    let offset = this.props.offset ? parseInt(this.props.offset) : 0;
    let limit = this.props.limit ? parseInt(this.props.limit) : 0;
    let count = this.props.count ? parseInt(this.props.count) : 0;
    let next = offset + limit;
    let previous = offset - limit;

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      newer: {
        id: 'pagination.newer',
        description: 'Newer content link text',
        defaultMessage: 'Newer',
      },
      older: {
        id: 'pagination.older',
        description: 'Older content link text',
        defaultMessage: 'Older',
      }
    });

    return (
      <ul className="pager">
        <li className="previous">
          { (previous >= 0) ?
            <a href="#"
               name={ previous }
               onClick={ this._onClick }>
              &larr; { formatMessage(messages.newer) }
            </a>
            : ''
          }
        </li>
        <li className="next">
          { (next < count) ?
            <a href="#"
               name={ next }
               onClick={ this._onClick }>
               { formatMessage(messages.older) } &rarr;
            </a>
            : ''
          }
        </li>
      </ul>
    );
  }
}

module.exports.Pagination = injectIntl(Pagination);
