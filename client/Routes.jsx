import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import App from './App';
import Login from './Login';
import Dashboard from './Dashboard';
import Event from './Event';

import WebAPIUtils from './utils/WebAPIUtils';

export default function(){
  return (
      <Route path='/' component={App} >
        <IndexRoute component={Login}/>
        <Route path='register' component={Login}/>
        <Route path='login' component={Login}/>
        <Route path='dashboard' component={Dashboard}/>
        <Route path='event' component={Event}/>
      </Route>
    );
}
