'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import routes from './routes.js';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RouterContext, match } from 'react-router';
import createHistory from 'history/lib/createMemoryHistory';
import getRoutes from '../client/routes';
import db from './controllers/dbController';
import ProjectActionCreators from '../client/actions/ProjectActionCreators';
import { createStore } from 'redux'
import { Provider } from 'react-redux'


const dbUrl = 'mongodb://localhost/shak';
const config = require('./db/config');
const app = express();

mongoose.connect(dbUrl)
  .then((data)=>{
    let mongoStore = MongoStore(session);
    let sessionStore =  new mongoStore({ url: dbUrl});

    if (process.env.NODE_ENV === 'development') {
      var webpack = require('webpack');
      var webpackConfig = require('./../webpack.config.js');
      var compiler = webpack(webpackConfig);
      app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
      }));
      app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log
      }));
    }

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(compression());
    app.use(morgan('tiny'));
    app.use('/static', express.static(__dirname + '/../static/'));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(session({
      store: sessionStore,
      secret: config.secret,
      resave: false,
      saveUninitialized: false
    }));

    (function() {
      // attaches all the routes to the server
      app.use(cors()); 
      routes.setup(app);
      app.use((req, res) => {
        const history = createHistory();
        const location = createLocation(req.originalUrl);
        const routes = getRoutes();

        match({ history, routes, location }, (error, redirectLocation, renderProps) => {


          if (redirectLocation) {
            return res.redirect(redirectLocation.pathname + redirectLocation.search);
          } else if (error) {
            console.error('ROUTER ERROR: ', error);
            return res.status(500).send(error.message);
          } else if (!renderProps) {
            return res.status(404).send('Not found.');
          } else if (renderProps) {
            try {

              function send(initialState){
                const componentHTML = renderToString(<RouterContext {...renderProps}/>);
                res.render('index', { componentHTML, initialState });
              }

              db.getApplicationState(function(data) {
                  if (!data) {
                    send(JSON.stringify({
                          status: 'couldnt load the projects'
                      }));
                  } else {
                    ProjectActionCreators.receieveProjects(data.projects);
                    ProjectActionCreators.receieveContact(data.contact);
                    ProjectActionCreators.receieveAbout(data.about);
                    send(JSON.stringify(data));
                  }
              });

            } catch(e) {
              console.error('error: ', e);
              throw e;
            }

          }
        });
      });
      let port = process.env.PORT || 8080;
      let server = app.listen(port);
      console.log("Express server listening on %d in %s mode", port, app.settings.env)
    })();
    
  });



