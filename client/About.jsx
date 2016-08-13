import React from 'react';
import uuid from 'node-uuid';
import ImgAndAClass from './ImgAndAClass';
import EditableDiv from './editCapableTextBox';
import Store from './stores/ProjectStore';

export default class Header extends React.Component{
  constructor(props){
    super(props);
  };
  componentWillMount(){
    this.init();
  };
  componentWillReceiveProps(nextProps){
    this.init();
  }
  init(){
    let obj = {};
    obj.about = Store.ProjectStore.getAbout();
    this.setState(obj);
  }
  renderElems(){
    //get link data
    //generate array of link elements
    let isEditAboutPage = this.props.route.path === "editAbout";
    let lockElems = !isEditAboutPage;
    let updateAboutContent = this.updateState.bind(this, 'aboutContent');
    let aboutContent = this.state.about.aboutContent;
    let links = this.state.about.links;
    let that = this;
    let saveAboutToDb = this.saveAboutToDb;
    let createLink = this.createLink;
    
    let linkElems = links.map((link, key) => {
      let deleteLink;
      let deleteElem;
      if(!lockElems){
        deleteLink = that.deleteLink.bind(that, key);
        deleteElem = (<img src="/static/x.png" onClick={deleteLink} />);
      } else {
        deleteElem = null;
      }
      return (<span key={key}><a href={""+link.url+""}>{link.name}</a>{deleteElem}</span>);
    });


    let elems = (<div className='aboutDescriptionContainer'>
                  <div className='aboutDescription'>
                    <EditableDiv lock={lockElems} onUpdate={updateAboutContent} divClass={'projectDescription'} inputClassName={'inputAboutDescriptionEdit'} placeholder={'Project Name Me'} content={aboutContent} isInputBox={false} />
                  </div>
                  <div className='aboutTitles'>
                    {linkElems}
                    <button className='inputTitleEditBtn' onClick={createLink}>create link</button>
                  </div>
                  <div className='aboutCredits'>
                    <div>Web Design: Shakeil Greeley</div>
                    <div>Web Development: Joseph Nayigiziki</div>
                    <br/>
                    <div>&#169; 2015 Shakeil Greeley. All rights reserved.</div>
                  </div>
                  <button className='inputTitleEditBtn' onClick='saveAboutToDb'>save about</button>
                </div>)

    return elems;
  };
  render(){
    let elems = this.renderElems();
    return (elems);
  };
  saveAboutToDb(){
    var about = {
      links : this.state.about.links,
      aboutContent : this.state.about.aboutContent
    };

    this.props.post('about', about)
      .then((data) =>{
        alert('success')
    });
  };
  deleteLink(key){
    let state = Util().copyObj(this.state);
    state.about.links.splice(key, 1);
    this.setState(state);
  };
  createLink(){

  }
  updateState(key, value){
    let obj = {};
    let state = Util().copyObj(this.state);
    state.about[key] = value;
    this.setState(state);
  };
};