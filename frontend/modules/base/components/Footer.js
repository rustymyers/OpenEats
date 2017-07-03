import React from 'react'
import {
    injectIntl,
    intlShape,
    FormattedMessage
} from 'react-intl';

require("../css/footer.css");

class Footer extends React.Component{
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="text-muted">
            <FormattedMessage
              id='footer.credit'
              description='Footer credit'
              defaultMessage='Created with {link}'
              values={{
                link: <a href="https://github.com/RyanNoelk/OpenEats">OpenEats</a>
              }}
            />
            &nbsp;-&nbsp;
            <FormattedMessage
              id='footer.icon_credit'
              description='Footer icons credit'
              defaultMessage='Icons made by {link} ({ccLink})'
              values={{
                link: <a href="http://www.flaticon.com/authors/nikita-golubev" title="Nikita Golubev">Nikita Golubev</a>,
                ccLink: <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
              }}
            />
          </p>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(Footer);