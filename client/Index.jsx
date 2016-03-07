import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router';
import browserHistoryObj from './BrowserHistory';
import Routes from './Routes';
import createHistory from 'history/lib/createBrowserHistory';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
const history = useScroll(createHistory)();
const browserHistory = browserHistoryObj();

ReactDOM.render(<Router history={browserHistory} routes={Routes()}/>, document.getElementById('app'));


