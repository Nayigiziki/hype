import React from 'react';
import Login from './Login.jsx';
import Header from './Header.jsx';
import WebAPIUtils from './utils/WebAPIUtils';

export default class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    };
  };
  render() {
    let loggedInStatus = this.state.loggedIn;
    let childrenComponents = this.renderChildren();
    return (<div>
              <div className='pageContent'>
                {childrenComponents}
              </div>
            </div>);
  };
  componentWillMount(){
    var that = this;
    WebAPIUtils.get('isAuth')
      .then(function(data){
        that.setState({
          loggedIn : data.data
        });
      });
  }
  componentWillMount(){
    // this.updateApplicationState();
  };
  isLoggedIn(){
    return this.state.loggedIn;
  }
  updateLoggedInState(isLoggedIn){
    this.setState({
      loggedIn: isLoggedIn
    });
  };
};