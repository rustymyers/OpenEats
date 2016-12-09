import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './base/components/App'
import NotFound from './base/components/404'
import About from './about/components/About'
import Login from './account/components/Login'
import News from './news/components/News'
import Browse from './browse/components/Browse'
import Create from './create/components/Create'
import Recipe from './recipe/components/Recipe'

// Load in the base CSS
require("./base/css/footer.css");

// Load in config file
// var config = require('config');

/*
function requireAuth(nextState, replace) {
  if (!Auth.loggedIn()) {
    replace({
      pathname:'/login/',
      state: {nextPathname: '/login/'}
    })
  }
}*/

render((
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={News}/>
          <Route path="/news" component={News}/>
          <Route path="/recipe/create" component={Create} /*onEnter={requireAuth}*//>
          <Route path="/recipe/:recipe" component={Recipe} />
          <Route path="/about" component={About}/>
          <Route path="/login" component={Login}/>
          <Route path="/browse" component={Browse}/>
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </div>
  ),
  document.getElementById('content')
);
