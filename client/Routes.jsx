import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import ProjectConstructor from './ProjectConstructor';
import App from './App';
import Login from './Login';
import LandingPage from './LandingPage';
import Projects from './Projects';
import Project from './Project';
import About from './About';

import WebAPIUtils from './utils/WebAPIUtils';

export default function(){
  return (
      <Route path='/' component={App} >
        <IndexRoute component={LandingPage}/>
        <Route path='login' component={Login} />
        <Route path='register' component={Login}/>
        <Route path='projectConstructor' component={Project} onEnter={WebAPIUtils.isAuth}/>
        <Route path='editProjects/:id' component={Projects} onEnter={WebAPIUtils.isAuth} />
        <Route path='editProject/:id' component={Project} onEnter={WebAPIUtils.isAuth}/>
        <Route path='projects/:id' component={Projects} />
        <Route path='project/:id' component={Project} />
        <Route path='editAbout' component={About} />
        <Route path='about' component={About} />
      </Route>
    );
}
