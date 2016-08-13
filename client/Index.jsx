import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router';
import browserHistoryObj from './BrowserHistory';
import Routes from './Routes';
import createHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import WebAPIUtils from './utils/WebAPIUtils';
import { match, RouterContext } from 'react-router';

const history = useScroll(createHistory)();
const browserHistory = browserHistoryObj();
WebAPIUtils.getInitialState();

match({ history:browserHistory , routes:Routes() }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(<Router {...renderProps} />, document.getElementById('app'))
});