import React from 'react';
import Login from './Login.jsx';
import Header from './Header.jsx';
import axios from 'axios';

export default class App extends React.Component {
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
              <Header isloggedIn={loggedInStatus} />
              <div className='pageContent'>
                {childrenComponents}
              </div>
            </div>);
  };
  renderChildren(){
    let updateLoggedInStateHandler = this.updateLoggedInState.bind(this);
    let updateSiteContentStateHandler = this.updateLoggedInState.bind(this);
    let get = this.get.bind(this);
    let post = this.post.bind(this);
    return React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          onUpdateLoggedInStatus : updateLoggedInStateHandler,
          onUpdateSiteContentStateHandler : updateSiteContentStateHandler,
          get : get,
          post : post
        });
    });
  };
  componentDidMount(){
    let boundGet = this.get.bind(this);
    let appComponentContext = this;
    let arr = [boundGet('projects'), boundGet('contact'), boundGet('about')];
    this.all(arr)
          .then((data) => {
            return {
              'projects' : data[0].projects,
              'contact' : data[1].contact,
              'about' : data[2].about
            };
          })
          .then((data) => {
            appComponentContext.updateSiteContentState(data);
          })
          .catch((err) => {
            console.log('error', err);
          });
  };
  updateLoggedInState(isLoggedIn){
    this.setState({
      loggedIn: isLoggedIn
    });
  };
  updateSiteContentState(siteContent){
    this.setState(siteContent);
  };
  get(url, payload){
    return axios.get('/api/' + url, payload)
                  .then((response) => {
                    if(response.status !== 404){
                      return response.data;
                    } else{
                      throw url + '-' + 'get error';
                    }
                  })
                  .catch((response) => {
                    console.log(response);
                  });
  };
  post(url, payload){
    return axios.post('/api/' + url, payload)
                  .then((response) => {
                    if(response.status !== 404){
                      return response;
                    } else{
                      throw url + '-' + 'post' + 'error';
                    }
                    
                  })
                  .catch((response) => {
                    console.log(response);
                  });
  };
  all(iterable){
    return axios.all(iterable)
                  .then((data) => {
                    return data;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
  };
};