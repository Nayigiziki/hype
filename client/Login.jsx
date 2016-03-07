import React from 'react';
import {Link} from 'react-router';
import browserHistoryObj from './BrowserHistory';

const browserHistory = browserHistoryObj();

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  componentWillMount(){
    if(this.props.location.pathname === '/register'){
      this.setState({registerOrLoginState : 'Register'});
      return;
    } 
    if(this.props.location.pathname === '/login') {
      this.setState({registerOrLoginState : 'Login'});
      return;
    }
  }
  componentWillReceiveProps(nextProps) {

    if(nextProps.location.pathname === '/register'){
      this.setState({registerOrLoginState : 'Register'});
      return;
    } 
    if(nextProps.location.pathname === '/login') {
      this.setState({registerOrLoginState : 'Login'});
      return;
    }
  }
  login(evt){
    evt.preventDefault();
    const path = '/projectConstructor';
    let loginContext = this;
    let credentials = {
        username: this.state.username,
        password : this.state.password
    };
    this.setState({
      username: '',
      password: ''
    });
    this.props.post('login', credentials)
                .then((response) => {
                    console.log(response);
                    if(response.status === 201) {
                      loginContext.props.onUpdateLoggedInStatus(true);
                      browserHistory.push(path);
                    } else {
                      console.log('User or Password invalid');
                    }
                  });

  }
  updateFormHandler(evt){
    let updateFormObject = {};
    updateFormObject[evt.target.name] = evt.target.value;
    this.setState(updateFormObject);
  }
  render() {
    let error = '';
    let updateFormHandler = this.updateFormHandler.bind(this);
    let onSubmitHandler = this.login.bind(this);
    let componentState = this.state.registerOrLoginState;
    let oppositeComponentState = componentState === 'Register' ? 'login' : 'register';
    let linkComponent =  (<Link to={"/" + oppositeComponentState }>{'go to ' + oppositeComponentState + ' page'}</Link>);
    return (<div> {componentState} {error}
              <form onSubmit={onSubmitHandler}>
                <p><input type="text" name="username" value={this.state.username} onChange={updateFormHandler} placeholder="Username or Email"/></p>
                <p><input type="password" name="password" value={this.state.password} onChange={updateFormHandler} placeholder="Password"/></p>
                <p className="submit"><input type="submit" name="commit" value="submit"/></p>
              </form>
              {linkComponent}
            </div>
  );
  }
};