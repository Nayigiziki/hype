import React from 'react';
import uuid from 'node-uuid';
import ImgAndAClass from './ImgAndAClass';

export default class Header extends React.Component{
  constructor(props){
    super(props);
  };
  renderHeader(){
    let notLoggedIn = (<div id='innerHeaderDiv'>
                        <ImgAndAClass edit={false} icon={'shakLogo'} text={null} destination='/'/>
                        <ImgAndAClass edit={false} icon={null} text={'work'} destination='/projects/all'/>
                        <ImgAndAClass edit={false} icon={null} text={'about'} destination='/about'/>
                        <ImgAndAClass edit={false} icon={null} text={'contact'} destination='/contact'/>
                       </div>);

    let loggedIn = (<div id='innerHeaderDiv'>
                       <ImgAndAClass edit={true} editIcon={'plus'} icon={'shakLogo'} text={null} destination='/projectConstructor'/>
                       <ImgAndAClass edit={true} editIcon={'pencil'} icon={'shakLogo'} text={null} destination='/editProjects/all'/>
                       <ImgAndAClass edit={false} icon={null} text={'work'} destination='/projects/all'/>
                       <ImgAndAClass edit={true} editIcon={'pencil'} icon={null} text={'about'} destination='/editAbout'/>
                       <ImgAndAClass edit={true} editIcon={'pencil'} icon={null} text={'contact'} destination='/editContact'/>
                    </div>); 

    if(this.props.isloggedIn){
      return loggedIn;
    } else  {
      return notLoggedIn;
    }
  };
  render(){
    let header = this.renderHeader();
    return (<div>Header</div>);
  }
};