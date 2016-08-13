import React from 'react';

export default class LandingPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {};  
  };
  render(){
    let images = null;
    return (<div className={'landingPageContainer'}>
            <div>Welcome to shakeil.com</div>
            <p></p>
            {images}
            <p></p>
          </div>);
  };
  renderImgs(){
    return null;
  };
};

