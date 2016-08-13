import React from 'react';
import {Link} from 'react-router';

export default class ImgAndAClass extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    var imgSrcObj = {
     'plus' : '/static/plus.png',
     'pencil' : '/static/pencil.png',
     'shakLogo' : '/static/shak_logo.png'
    };

    let  reactFragment = [];
    //first fragmentpiece
      //if!icon
        // else word

    if(this.props.icon){
      let icon = React.DOM.img({src: imgSrcObj[this.props.icon], key: 'Icon', className: 'item' });
      reactFragment.push(icon);
    } else {
      let word = this.props.text;
      reactFragment.push(word);
    } 

    //2nd fragment piece
      //editLogo

    if(this.props.edit){
      let editIcon = React.DOM.img({src: imgSrcObj[this.props.editIcon], key: 'editIcon', className: 'logo' });
      reactFragment.push(editIcon);
    }

    //last fragment piece
      //destination
    
    return React.createElement(Link, {className: 'item', to: this.props.destination }, reactFragment);
  }
};