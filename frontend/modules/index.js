import React from 'react'
import { render } from 'react-dom'
import { IntlProvider, addLocaleData } from 'react-intl'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Load default locale data;
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';
addLocaleData([...en, ...es, ...de]);

const messages = require('../locale/'+process.env.LOCALE+'.json');

import App from './base/components/App'
import Footer from './base/components/Footer'
import NotFound from './base/components/404'
import Login from './account/components/Login'
import News from './news/components/News'
import Browse from './browse/components/Browse'
import GroceryList from './list/components/GroceryList'
import { RecipeForm } from './recipe_form/components/RecipeForm'
import { ImportForm } from './recipe_form/components/ImportForm'
import Recipe from './recipe/components/Recipe'
import AuthStore from './account/stores/AuthStore'

// Load in the base CSS
require("../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss");
require("./base/css/core.css");

const requireAuth = (nextState, replace) => {
  if (!AuthStore.isAuthenticated()) {
    replace('/browse');
  }
};

const routeConfig = [
  { path: '/',
    component: App,
    indexRoute: { component: News },
    childRoutes: [
      { path: 'news', component: News },
      { path: 'login', component: Login },
      { path: 'browse', component: Browse },
      { path: 'list', component: GroceryList, onEnter: requireAuth ,
        childRoutes: [
          { path: ':list_id', component: GroceryList, onEnter: requireAuth },
        ]
      },
      { path: 'recipe',
        childRoutes: [
          { path: 'create', component: RecipeForm, onEnter: requireAuth },
          { path: 'import', component: ImportForm, onEnter: requireAuth },
          { path: 'edit/:id', component: RecipeForm, onEnter: requireAuth },
          { path: ':recipe', component: Recipe }
        ]
      },
      { path: '*', component: NotFound }
    ]
  }
]

render((
    <IntlProvider locale={ process.env.LOCALE } messages={ messages }>
      <div>
        <div id="content">
          <Router
            history={ browserHistory }
            routes={ routeConfig }
          />
        </div>
        <Footer />
      </div>
    </IntlProvider>
  ),
  document.getElementById('app')
);
