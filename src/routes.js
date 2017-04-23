import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import StarsWarsComponent from './components/StarsWarsComponent';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import SearchPage from './components/SearchPageComponent';
import HeaderComponent from './components/HeaderComponent';

export default (
  <div>
  	<IndexRoute component={HeaderComponent} />
  	<Route path="/starwarslogin" component={StarsWarsComponent} />
  	<Route path="/starwars/:username" component={SearchPage} />
  </div>
  
);
