import React from 'react';
import EditableDiv from './editCapableTextBox';
import EditableSpan from './editCapableSpanAndTextBox';
import EditableATag from './editCapableATagAndTextBox';
import ImageUploader from './ImageUploader';
import browserHistoryObj from './BrowserHistory';
import Util from './Util';
import _ from 'underscore';
import ProjectActionCreators from './actions/ProjectActionCreators';
import ProjectStore from './stores/ProjectStore';

const browserHistory = browserHistoryObj();

export default class Project extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      __v : null,
      _id : '',
      project: {
        projectTitle: '',
        projectImageUrls: [],
        projectDescription: '',
        projectCollaborators: '',
        projectClient: '',
        projectDiscipline : '',
        projectDetails : '',
        projectUrl : ''
      }
    }
  };
  componentWillMount(){
    this.init(this.props);
  };
  componentWillReceiveProps(nextProps){
    this.init(nextProps);
  }
  init(props){
    let next, previous, discipline;
    let projectsFromStore = ProjectStore.ProjectStore.getProjects();
    let projectReferences = projectsFromStore.projectReferences;
    let projectTitle = props.params.id;

    if(!projectTitle || !projectReferences[projectTitle]) {
      return;
    };
    
    let obj = {
      __v : projectReferences[projectTitle].__v,
      _id : projectReferences[projectTitle]._id,
      project : projectReferences[projectTitle].project 
    };

    let state = props.location.state;  

    if(state) {
      let all = projectsFromStore.projectReferences;

      discipline = state.currentlyDisplayedDiscipline;
      next = {
        image : all[state.next.projectTitle].project.projectImageUrls[0],
        projectTitle: state.next.projectTitle,
        key: state.next.key
      };
      previous = {
        image : all[state.previous.projectTitle].project.projectImageUrls[0],
        projectTitle: state.previous.projectTitle,
        key: state.previous.key        
      }; 
    } else  {
      let all = projectsFromStore.projects.all;

      discipline = 'all';
      for(let index = 0; index < all.length; index++){
        if(all[index].project.projectTitle === projectTitle) {
          let nextKey = all[index + 1] ? index + 1 : 0;
          let prevKey = all[index - 1] ? index - 1 : all.length - 1;
          next = {
            image: all[nextKey].project.projectImageUrls[0],
            projectTitle : all[nextKey].project.projectTitle,
            key : nextKey
          };
          previous = {
            image: all[prevKey].project.projectImageUrls[0],
            projectTitle: all[prevKey].project.projectTitle,
            key : prevKey
          };
          break;
        }
      }
    }
    obj['discipline'] = discipline;
    obj['next'] = next;
    obj['previous'] = previous;
    this.setState(obj);
  }  
  render(){
    let projectsFromStore = ProjectStore.ProjectStore.getProjects();
    let projectReferences = projectsFromStore.projectReferences;
    let createProjectPage = this.props.route.path === "projectConstructor";
    let lockElems = this.props.route.path === "project/:id";

    if(!createProjectPage && (!this.props.params.id || !projectReferences[this.props.params.id]) ){
      return (<div>What?</div>);
    }

    let updateProjectTitle = this.updateState.bind(this, 'projectTitle');
    let updateImages = this.updateState.bind(this, 'projectImageUrls');
    let updateProjectDescription = this.updateState.bind(this, 'projectDescription');
    let updateProjectClient =  this.updateState.bind(this, 'projectClient');
    let updateProjectCollaborators =  this.updateState.bind(this, 'projectCollaborators');
    let updateProjectDiscipline =  this.updateState.bind(this, 'projectDiscipline'); 
    let updateProjectDetails =  this.updateState.bind(this, 'projectDetails');
    let updateProjectUrl = this.updateState.bind(this, 'projectUrl');

    let projectTitle =this.state.project.projectTitle; 
    let projectImageUrls = this.state.project.projectImageUrls; 
    let projectDescription = this.state.project.projectDescription; 
    let projectClient = this.state.project.projectClient; 
    let projectCollaborators = this.state.project.projectCollaborators; 
    let projectDiscipline = this.state.project.projectDiscipline  
    let projectDetails = this.state.project.projectDetails; 
    let projectUrl = this.state.project.projectUrl;

    let saveProjectToDB = this.saveProjectToDB.bind(this, this.state.project);
    let deleteProjectFromDB = this.deleteProjectFromDB.bind(this, this.state.project);

    let saveBtn = lockElems ? null : (<div className='submitContainer'><button className='inputTitleEditBtn' onClick={saveProjectToDB}>{'Save Changes'}</button></div>);
    let deleteBtn = lockElems || createProjectPage ? null : (<div className='submitContainer'><button className='inputTitleEditBtn' onClick={deleteProjectFromDB}>{'Delete Project'}</button></div>);
    let footer = createProjectPage ? null : this.renderFooterElems();

    return (<div>
      <EditableDiv lock={lockElems} onUpdate={updateProjectTitle} divClass={'projectTitleTextContainer'} inputClass={'inputTitleEdit'} placeholder={'Project Name Me'} content={projectTitle} isInputBox={true} />
      <ImageUploader lock={lockElems} onUpdate={updateImages} images={projectImageUrls}/>
      <div className='projectDescriptionContainer'>
        <EditableDiv lock={lockElems} onUpdate={updateProjectDescription} divClass={'projectDescription'} inputClass={'inputProjectDescriptionEdit'} placeholder={'sup'} content={projectDescription} isInputBox={false} editProjectDescriptionText={true} />
        <span className='projectTitles'>
          <EditableSpan lock={lockElems} onUpdate={updateProjectClient} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} content={projectClient} spanText={'Client'}/>
          <EditableSpan lock={lockElems} onUpdate={updateProjectDiscipline} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} content={projectDiscipline} spanText={'Discipline'}/>
          <EditableSpan lock={lockElems} onUpdate={updateProjectCollaborators} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} content={projectCollaborators} spanText={'Collaborators'}/>
          <EditableSpan lock={lockElems} onUpdate={updateProjectDetails} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} content={projectDetails} spanText={'Details'}/>
          <EditableATag lock={lockElems} onUpdate={updateProjectUrl} divClass={''} inputClass={''} placeholder={'sup'} isInputBox={true} content={projectUrl} spanText={'Project Url'} />
        </span>
      </div>
      {saveBtn}
      {deleteBtn}
      {footer}
      </div>);
  };
  renderFooterElems(){
    let projectsFromStore = ProjectStore.ProjectStore.getProjects();
    let projectReferences = projectsFromStore.projectReferences;

    let previous = this.state.previous;
    let next = this.state.next;

    let goToPreviousProj = this.goToProj.bind(this, projectReferences[this.state.previous.projectTitle], this.state.previous.key);
    let goToNextProj = this.goToProj.bind(this, projectReferences[this.state.next.projectTitle], this.state.next.key);

    return (<div className='rectContainer'>
      <div className='square' onClick={goToPreviousProj}>
        <img className='prevImg' src={this.state.previous.image} />
      </div>

      <div className='line'></div>

      <div className='square' onClick={goToNextProj}>
        <img className='nextImg' src={this.state.next.image} />
      </div>
    </div>);
  }
  goToProj(project, key){
    let projectsFromStore = ProjectStore.ProjectStore.getProjects();
    let discipline = this.state.discipline;
    let projects = projectsFromStore.projects[discipline];

    let goToProjectPage = this.props.route.path === "project/:id";
    let destination = goToProjectPage ? '/project/' : '/editProject/';
    let location = {
      pathname: destination + project.project.projectTitle
    };

    let largestIndex = projects.length - 1;
    let prevKey = projects[key - 1] ? key - 1 : largestIndex;
    let nextKey = projects[key + 1] ? key + 1 : 0;

    location['state'] = {
      currentlyDisplayedDiscipline : discipline,
      next : {
        projectTitle : projects[nextKey].project.projectTitle,
        key : nextKey
      },
      previous : {
        projectTitle : projects[prevKey].project.projectTitle,
        key : prevKey
      }
    };

    browserHistory.push(location);
  }
  updateState(key, value){
    let obj = {};
    let projectState = Util().copyObj(this.state);
    if(key === 'projectDiscipline'){
      value = value.toLowerCase();
    }
    projectState.project[key] = value;
    this.setState(projectState);
  }
  saveProjectToDB(){
    let projectState = Util().copyObj(this.state);
    let that = this;
    let projectHasUUID = projectState._id.length > 0; 
    let ajaxCall = this.props.route.path === "projectConstructor" ? this.props.post('project', projectState) : this.props.put('project', projectState);

    ajaxCall
      .then((data) => {
        //delete initial state
        if(data.data.status === "successfully updated project" || data.data.status === "successfully added project to db"){
          //toast
          return that.props.get('projects');
        } else {
          alert('project did not update');
        }
      })
      .then((data) => {
        if(data.data.status === "successfully fetched the from the db"){
          ProjectActionCreators.receieveProjects(data.data.projects);
          //need to add toast
          //and navigate to created page
          browserHistory.push({
            pathname: '/editProjects/all'
          });
          // delete window.__INITIAL_STATE__;
        } else {
          alert('Project not created');
        }
      });
  }
  deleteProjectFromDB(){
    let projectState = Util().copyObj(this.state);
    let that = this;
    let projectHasUUID = projectState._id.length > 0; 

    if(projectHasUUID){
      this.props._delete_('project', {_id:projectState._id})
        .then((data) =>{
          //delete initial state
          if(data.data.status === "successfully deleted project"){
            //toast
            return that.props.get('projects');
          } else {
            alert('project did not delete');
          }
        })
        .then((data) => {
          if(data.data.status === "successfully fetched the from the db"){
            ProjectActionCreators.receieveProjects(data.data.projects);
            //need to add toast
            //and navigate to created page
            browserHistory.push({
              pathname: '/editProjects/all'
            });
            // delete window.__INITIAL_STATE__;
          } else {
            alert('Project not created');
          }
        })
    } else {
      alert('Call joe, tell him line 222 is fucking up');
    }
  }
};

