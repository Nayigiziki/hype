import axios from 'axios';
import ProjectActionCreators from '../actions/ProjectActionCreators';
import browserHistoryObj from '../BrowserHistory';

const browserHistory = browserHistoryObj();

var getProjects = (url, payload) => {
  return axios.get('/api/projects', payload)
                .then((response) => {
                  if(response.status !== 404){
                    console.log('got projects dood');
                    ProjectActionCreators.receieveProjects(response.data.projects);
                    return response.data.projects;
                  } else{
                    throw url + '-' + 'get error';
                  }
                })
                .catch((response) => {
                  console.log(response);
                });
};

var getInitialState = () => {
  if(window.__INITIAL_STATE__){
    console.log('got initial state', window.__INITIAL_STATE__);
    var state = window.__INITIAL_STATE__;
    ProjectActionCreators.receieveProjects(state.projects);
    ProjectActionCreators.receieveContact(state.contact);
    ProjectActionCreators.receieveAbout(state.about);
  } else {
    console.log('did not get initial state');
    getProject()
      .then((projects) => {
        //storing fetched projects
        ProjectActionCreators.receieveProjects(projects);
      });
  }
}

var isClient = () => {
   return typeof window != 'undefined' && window.document;
}

var get = (url, payload) => {
    return axios.get('/api/' + url, payload);
};

var post = (url, payload) => {
    return axios.post('/api/' + url, payload);
};

var put = (url, payload) => {
    return axios.put('/api/' + url, payload);
};

var _delete_ = (url, payload) => {
    return axios.delete('/api/' + url +'/' + payload._id);
};

var isAuth = (nextState, replace) => {
  console.log('isclient', isClient())
  if(isClient()){
    return get('isAuth')
    .then((data) =>{
      console.log('isAuth', data);
      if(data.data.status !== 'Logged in'){
        browserHistory.push('/');
      }
    }); 
  } else {
    console.log('nawwwwwww')
  }
};

export default { getProjects, getInitialState, get, post, put, _delete_ , isAuth};
