import React from 'react'
import {
    injectIntl,
    IntlProvider,
    defineMessages,
    formatMessage
} from 'react-intl';

import authCheckRedirect from '../../common/authCheckRedirect'
import ImportActions from '../actions/ImportActions';
import { ImportStore, CHANGE_EVENT } from '../stores/ImportStore';

require("./../css/import.scss");
let Spinner = require('react-spinkit');


class ImportForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getStateFromStore();

    this.ImportRecipe = this.ImportRecipe.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this.toggleSupportedSites = this.toggleSupportedSites.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState(this.getStateFromStore());
  }

  getStateFromStore() {
    return {
      source: ImportStore.getStateValue('source'),
      loading: ImportStore.getStateValue('loading'),
      error: ImportStore.getStateValue('error'),
      websites: ImportStore.getStateValue('websites'),
      supportedSites: ImportStore.getStateValue('supportedSites'),
      showSupportedSite: ImportStore.getStateValue('showSupportedSite'),
    };
  }

  componentDidMount() {
    authCheckRedirect();
    ImportActions.init();
    ImportStore.addChangeListener(CHANGE_EVENT, this._onChange);
  }

  componentWillUnmount() {
    ImportStore.removeChangeListener(CHANGE_EVENT, this._onChange);
  }

  toggleSupportedSites() {
    ImportActions.toggleSupportedSites();
  }

  handleChange (event) {
    this.setState({source: event.target.value});
  }

  handleKeyDown (event) {
    if (event.which === 13) {
      this.ImportRecipe(event);
    }
  }

  ImportRecipe(e) {
    e.preventDefault();
    ImportActions.importRecipe(this.state.source);
  }

  render() {
    const {formatMessage} = this.props.intl;
    const messages = defineMessages({
      header: {
        id: 'recipe.import.header',
        description: 'Rating source placeholder',
        defaultMessage: 'Import A Recipe',
      },
      label: {
        id: 'recipe.import.source_label',
        description: 'Enter a URL to gather recipe data',
        defaultMessage: 'Enter a URL to gather recipe data',
      },
      websites: {
        id: 'recipe.import.websites',
        description: 'Supported Websites',
        defaultMessage: 'Supported Websites',
      },
      import: {
        id: 'recipe.import.import',
        description: 'Import',
        defaultMessage: 'Import',
      },
      importing: {
        id: 'recipe.import.importing',
        description: 'Importing. Please wait',
        defaultMessage: 'Importing',
      },
      error: {
        id: 'recipe.import.error',
        description: 'Error',
        defaultMessage: 'Error',
      },
      error_message_1: {
        id: 'recipe.import.error_message_1',
        description: 'Unknown Error',
        defaultMessage: 'Something went wrong! Please try again.',
      },
      error_message_2: {
        id: 'recipe.import.error_message_2',
        description: 'Website not supported',
        defaultMessage: 'This Website is not supported. ',
      },
      error_message_3: {
        id: 'recipe.import.error_message_3',
        description: 'Invalid URL',
        defaultMessage: 'Please enter a valid URL.',
      },
      hide_sites: {
        id: 'recipe.import.hide_sites',
        description: 'hide supported sites',
        defaultMessage: 'show supported sites',
      },
      show_sites: {
        id: 'recipe.import.show_sites',
        description: 'show supported sites',
        defaultMessage: 'show supported sites',
      }
    });

    let error_message = '';
    if (this.state.error == 1) {
      error_message = formatMessage(messages.error_message_1)
    } else if (this.state.error == 2) {
      error_message = formatMessage(messages.error_message_2)
    } else if (this.state.error == 3) {
      error_message = formatMessage(messages.error_message_3)
    }

    let websites = this.state.supportedSites.map(function (website) {
      return <a key={ website } href={ "http://" + website } className="list-group-item col-md-6 col-xs-12">{ website }</a>;
    });

    let supportedWebsites = (
      <div className="row list-group">
        <a className="list-group-item disabled col-xs-12">{ formatMessage(messages.websites) }</a>
        { websites }
      </div>
    );

    let toggle = (
      <p>
        { formatMessage(messages.show_sites) }
        <span className="glyphicon glyphicon glyphicon-zoom-in"/>
      </p>
    );
    if (this.state.showSupportedSite) {
      toggle = (
        <p>
        { formatMessage(messages.hide_sites) }
          <span className="glyphicon glyphicon glyphicon-zoom-out"/>
        </p>
      );
    }

    return (
      <div className="container">
        <div className="row import-recipe">
          <div className="col-lg-offset-2 col-lg-8">
            { (this.state.error !== 0) ?
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign"
                      aria-hidden="true"/>&nbsp;
                <span>{ formatMessage(messages.error) }: </span>
                { error_message }
              </div> : null
            }
            <div className="import-recipe-heading">
              <h3>{ formatMessage(messages.header) }</h3>
              <div className="pull-right" onClick={ this.toggleSupportedSites }>
                { toggle }
              </div>
            </div>
            { (this.state.showSupportedSite) ? supportedWebsites : null }
            <input
              type="text"
              autoFocus="true"
              className="form-control"
              placeholder={ formatMessage(messages.label) }
              value={ this.state.value }
              onChange={ this.handleChange }
              onKeyDown={ this.handleKeyDown }
            />

            { (!this.state.loading) ?
              <button
                type="button"
                className="btn btn-lg btn-primary btn-block"
                onClick={ this.ImportRecipe }
              >{ formatMessage(messages.import) }</button>
              :
              <button type="button" className="btn btn-primary btn-lg btn-block" disabled>
                { formatMessage(messages.importing) }
                <Spinner className="spinner-obj" spinnerName="wave" noFadeIn />
              </button>
            }
          </div>
        </div>
      </div>
    )
  }
};

module.exports.ImportForm = injectIntl(ImportForm);