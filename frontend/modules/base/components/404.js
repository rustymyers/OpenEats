import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

require("../css/404.scss");

export default injectIntl(React.createClass({
  render: function() {

    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      header: {
        id: '404.header',
        description: '404 Header',
        defaultMessage: 'Our chef\'s ruined this recipe in the test kitchen, we suggest you try something else',
      },
      message: {
        id: '404.message',
        description: '404 Message',
        defaultMessage: 'Sorry the page came back with a 404 error we can\'t find what you are looking for',
      }
    });

    return (
      <div className="not-found">
        <h3>{formatMessage(messages.header)}</h3>
        <img className="img-responsive" src="/images/404.png" alt="404 image"/>
        <p>{formatMessage(messages.message)}</p>
      </div>
    );
  }
}));
