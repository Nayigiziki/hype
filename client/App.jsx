import React from 'react';
import Login from './Login.jsx';
import Header from './Header.jsx';
import WebAPIUtils from './utils/WebAPIUtils';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    };
  };
  render() {
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
  renderChildren(){
    let updateLoggedInStateHandler = this.updateLoggedInState.bind(this);
    let updateSiteContentStateHandler = this.updateLoggedInState.bind(this);
    let isLoggedIn = this.isLoggedIn.bind(this);

    return React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          onUpdateLoggedInStatus : updateLoggedInStateHandler,
          onUpdateSiteContentStateHandler : updateSiteContentStateHandler,
          isLoggedIn : isLoggedIn,
          post: WebAPIUtils.post,
          get : WebAPIUtils.get,
          put : WebAPIUtils.put,
          _delete_ : WebAPIUtils._delete_
        });
    });
  };
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
  updateSiteContentState(siteContent){
    this.setState(siteContent);
  };
};