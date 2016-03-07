import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import ProjectConstructor from './ProjectConstructor';
import App from './App';
import Login from './Login';
import LandingPage from './LandingPage';


export default function(){
  return (
      <Route path='/' component={App}>
        <IndexRoute component={LandingPage}/>
        <Route path='login' component={Login}/>
        <Route path='register' component={Login}/>
        <Route path='projectConstructor' component={ProjectConstructor}/>
      </Route>
    );
}
