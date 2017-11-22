import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
    injectIntl,
    defineMessages,
} from 'react-intl'

const RecipeFooter = ({ id, source, username, updateDate, showEditLink, intl }) => {
  const messages = defineMessages({
    source: {
      id: 'recipe.source',
      description: 'Source of the recipe',
      defaultMessage: 'Source'
    },
    created_by: {
      id: 'recipe.created_by',
      description: 'Created by',
      defaultMessage: 'Created by'
    },
    last_updated: {
      id: 'recipe.last_updated',
      description: 'Last Updated',
      defaultMessage: 'Last Updated'
    },
    edit_recipe: {
      id: 'recipe.edit_recipe',
      description: 'Edit recipe button text',
      defaultMessage: 'Edit recipe'
    },
  });

  let hostname = '';
  if (source) {
    // Get Host name of a URL
    let a = document.createElement('a');
    a.href = source;
    hostname = a.hostname;
  }

  const sourceLink = (
    <div>
      { intl.formatMessage(messages.source) }:
      <a href={ source }>{ hostname }</a>
    </div>
  );

  const editLink = (
    <Link to={ "/recipe/edit/" + id }>
      <button className="btn btn-primary btn-sm">
        { intl.formatMessage(messages.edit_recipe) }
      </button>
    </Link>
  );
  
  return (
    <div className="panel-footer">
      <div className="row">
        <div className="col-lg-10 col-md-6 col-xs-8">
          { (source) ? sourceLink : null }
          <div>{ intl.formatMessage(messages.created_by) }: { username }</div>
          <div>{ intl.formatMessage(messages.last_updated) }: { updateDate }</div>
        </div>
        <div className="col-lg-2 col-md-6 col-xs-4 pull-right text-right">
          { showEditLink ? editLink : null }
        </div>
      </div>
    </div>
  );
};

RecipeFooter.PropTypes = {
  id: PropTypes.number.isRequired,
  source: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  updateDate: PropTypes.instanceOf(Date).isRequired,
  showEditLink: PropTypes.bool.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(RecipeFooter);
