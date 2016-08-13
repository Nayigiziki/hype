import React from 'react';
import EditableDiv from './editCapableTextBox';
import EditableSpan from './editCapableSpanAndTextBox';
import EditableATag from './editCapableATagAndTextBox';
import ImageUploader from './ImageUploader';
import browserHistoryObj from './BrowserHistory';
import Util from './Util';
import _ from 'underscore';
import ProjectActionCreators from './actions/ProjectActionCreators';

const browserHistory = browserHistoryObj();

                    // if(response.status !== 404){
                    //   if(url === 'createProject'){
                    //     console.log('create project updating site state');
                    //     that.updateApplicationState();
                    //   }
                    //   return response;
                    // } else{
                    //   throw url + '-' + 'post' + 'error';
                    // }

export default class ProjectConstructor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      projectTitle: '',
      projectImageUrls: [],
      projectDescription: '',
      projectCollaborators: '',
      projectClient: '',
      projectDiscipline : '',
      projectDetails : '',
      projectUrl : ''
    }
  };
  componentWillMount(){
    console.log(this.props)
    this.setState({
      projectTitle : this.props.routeParams.id
    })
  };
  componentWillReceiveProps(nextProps){
  };
  render(){
    let updateProjectTitle = this.updateState.bind(this, 'projectTitle');
    // let projectTitle = 
    let updateImages = this.updateState.bind(this, 'projectImageUrls');
    let updateProjectDescription = this.updateState.bind(this, 'projectDescription');
    let updateProjectClient =  this.updateState.bind(this, 'projectClient');
    let updateProjectCollaborators =  this.updateState.bind(this, 'projectCollaborators');
    let updateProjectDiscipline =  this.updateState.bind(this, 'projectDiscipline');
    let updateProjectDetails =  this.updateState.bind(this, 'projectDetails');
    let updateProjectUrl = this.updateState.bind(this, 'projectUrl');
    let saveProjectToDB = this.saveProjectToDB.bind(this);

    return (<div>
      <EditableDiv onUpdate={updateProjectTitle} divClass={'projectTitleTextContainer'} inputClass={'inputTitleEdit'} placeholder={'Project Name Me'} isInputBox={true} />
      <ImageUploader onUpdate={updateImages} lock={lockElems} images={projectImageUrls}/>
      <div className='projectDescriptionContainer'>
        <EditableDiv onUpdate={updateProjectDescription} divClass={'projectDescription'} inputClass={'inputProjectDescriptionEdit'} placeholder={'sup'} isInputBox={false} editProjectDescriptionText={true} />
        <span className='projectTitles'>
          <EditableSpan onUpdate={updateProjectClient} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} spanText={'Client'}/>
          <EditableSpan onUpdate={updateProjectDiscipline} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} spanText={'Discipline'}/>
          <EditableSpan onUpdate={updateProjectCollaborators} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} spanText={'Collaborators'}/>
          <EditableSpan onUpdate={updateProjectDetails} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} spanText={'Details'}/>
          <EditableATag onUpdate={updateProjectUrl} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} spanText={'Project Url'} />
        </span>
      </div>
      <div className='submitContainer'>
          <button className='inputTitleEditBtn' onClick={saveProjectToDB}>{'Create Project'}</button>  
      </div>
      </div>);
  };
  updateState(key, value){
    let obj = {};
    if(key === 'projectDiscipline'){
      value = value.toLowerCase();
    }
    obj[key] = value;
    this.setState(obj);
  }
  saveProjectToDB(){
    let state = Util().copyObj(this.state);
    let that = this;
    let isNewProject = _.reduce(state, (accumulator,  projectProperty)=>{
      if(accumulator === false){
        return false;
      }
      if(projectProperty.length > 0){
        return true;
      } else {
        return false;
      }
    }, true);

    if(isNewProject){
      this.props.post('project', state)
        .then((data) =>{
          //delete initial state
          return that.props.get('projects');
        })
        .then((data) => {
          if(data.status === 200){
            ProjectActionCreators.receieveProjects(data.data.projects);
            //navigate to newly created project
            //toast
            browserHistory.push({
              pathname: '/editProjects/all'
            });
            delete window.__INITIAL_STATE__;
          } else {
            alert('Project not created');
          }
        })
    }

  }
};

