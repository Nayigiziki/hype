'use strict';

import express from 'express';
import cors from 'cors';
import parser from 'body-parser';
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

const config = require('./db/config');
const dbUrl = 'mongodb://localhost/shak';
const app = express();

let mongoStore = MongoStore(session);
let sessionStore =  new mongoStore({ url: dbUrl});

let initServer = function() {
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
          const componentHTML = renderToString(<RouterContext {...renderProps}/>);
          res.render('index', { componentHTML});
        }
        catch(e) {
          console.error('error: ', e);
          throw e;
        }

      }
    });
  });
  let port = process.env.PORT || 8080;
  let server = app.listen(port);
  console.log("Express server listening on %d in %s mode", port, app.settings.env)
}

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

mongoose.connect(dbUrl);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression());
app.use(morgan('tiny'));
app.use('/static', express.static(__dirname + '/../static/'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());
app.use(session({
  store: sessionStore,
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

initServer();