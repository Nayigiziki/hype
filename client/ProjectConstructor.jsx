import React from 'react';
import EditableDiv from './editCapableTextBox';
import EditableSpan from './editCapableSpanAndTextBox';
import EditableATag from './editCapableATagAndTextBox';
import ImageUploader from './ImageUploader';

export default class ProjectConstructor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      projectTitle: '',
      images: [],
      projectDescription: '',
      projectClient: '',
      projectDiscipline : '',
      projectDetails : '',
      projectUrl : ''
    }
  };
  render(){
    let updateProjectTitle = this.updateState.bind(this, 'projectTitle');
    let updateImages = this.updateState.bind(this, 'images');
    let updateProjectDescription = this.updateState.bind(this, 'projectDescription');
    let updateProjectClient =  this.updateState.bind(this, 'projectClient');
    let updateProjectDiscipline =  this.updateState.bind(this, 'projectDiscipline');
    let updateProjectDetails =  this.updateState.bind(this, 'projectDetails');
    let updateProjectUrl = this.updateState.bind(this, 'projectUrl');
    debugger;
    return (<div>
      <EditableDiv onUpdate={updateProjectTitle} divClass={'projectTitleTextContainer'} inputClass={'inputTitleEdit'} placeholder={'Project Name Me'} isInputBox={true} />
      <ImageUploader onUpdate={updateImages}/>
      <div className='projectDescriptionContainer'>
        <EditableDiv onUpdate={updateProjectDescription} divClass={'projectDescription'} inputClass={'inputProjectDescriptionEdit'} placeholder={'sup'} isInputBox={false} editProjectDescriptionText={true} />
        <span className='projectTitles'>
          <EditableSpan onUpdate={updateProjectClient} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} spanText={'Client'}/>
          <EditableSpan onUpdate={updateProjectDiscipline} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} spanText={'Discipline'}/>
          <EditableSpan onUpdate={updateProjectDetails} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} spanText={'Details'}/>
          <EditableATag onUpdate={updateProjectUrl} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} spanText={'Project Url'} />
        </span>
      </div>
      </div>);
  };
  updateState(key, value){
    let obj = {};
    obj[key] = value;
    this.setState(obj);
  }
};

