import React from 'react';
import Util from './Util';
import {Link} from 'react-router';
import ProjectStore from './stores/ProjectStore';
import WebAPIUtils from './utils/WebAPIUtils';
import uuid from 'node-uuid';
import browserHistoryObj from './BrowserHistory';

const browserHistory = browserHistoryObj();

export default class Projects extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      projects: [],
      currentlyDisplayedDiscipline : '',
      projectReferences : null
    };
  };
  componentWillMount(){
    let context = this;
    let projectsFromStore = ProjectStore.ProjectStore.getProjects();

    if(projectsFromStore === null){
      WebAPIUtils.getProjects()
        .then((projects)=>{
          context.sort(projects);
          context.setState({
            projects : context.sort(projects),
            currentlyDisplayedDiscipline: context.props.params.id
          });
        })
    } else {
      projectsFromStore = Util().copyObj(projectsFromStore);
      //check if project ref works
      this.setState({
        projects : projectsFromStore.projects,
        currentlyDisplayedDiscipline: this.props.params.id,
        projectReferences : projectsFromStore.projectReferences
      });
    }

  };
  componentWillReceiveProps(nextProps) {
    this.setState({
        currentlyDisplayedDiscipline: nextProps.params.id
    });
  };
  render() {
    let projects = this.renderProjects();
    let projectsHeader = this.renderProjectsHeader();
    return (<div>
              <nav className='containerWork'>
                {projectsHeader}
              </nav>
              <div className='imgContainer'>
                {projects}
              </div>
            </div>);
  };

  renderProjectsHeader(){
    let headers = Object.keys(this.state.projects);
    let that = this;
    let topLevelRoute =  this.props.isLoggedIn() ? '/editProjects/' : '/projects/';
    console.log()
    return headers.map((header)=>{
      let keyVal = uuid.v1();
      return  <Link className={'itemWork'} key={keyVal} to={topLevelRoute+header}>{header}</Link>
    });
  }
  show(filterBy){
    console.log('filterby item', filterBy);
  }
  renderProjects(){
    let lockElems = this.props.route.path === "projects/:id";
    let projects = this.state.projects[this.state.currentlyDisplayedDiscipline];
    let that = this;
    return projects.map((project, keyValue) => {
      let pencil;
      if(lockElems){
        pencil =  null;
      } else {
        pencil = (<img key={uuid.v1()} className='logoEdit' src="/static/pencil.png"/>);
      }
      return(
          <span key={uuid.v1()} className='overLayContainer' onClick={that.goToProj.bind(that, project, keyValue)}>
              <img key={uuid.v1()} className='workImg' src={project.project.projectImageUrls[0]}/>
              <span key={uuid.v1()} align='middle' className='overLay'>{project.project.projectTitle}
                {pencil}
              </span>
            </span>
        );
    });
  };
  goToProj(project, key){
    let goToProjectPage = this.props.route.path === "projects/:id";
    let destination = goToProjectPage ? '/project/' : '/editProject/';
    let location = {
      pathname: destination + project.project.projectTitle
    };
    let largestIndex = this.state.projects[this.state.currentlyDisplayedDiscipline].length - 1;
    let prevKey = this.state.projects[this.state.currentlyDisplayedDiscipline][key - 1] ? key - 1 : largestIndex;
    let nextKey = this.state.projects[this.state.currentlyDisplayedDiscipline][key + 1] ? key + 1 : 0;  
    location['state'] = {
      currentlyDisplayedDiscipline : this.state.currentlyDisplayedDiscipline,
      next : {
        projectTitle : this.state.projects[this.state.currentlyDisplayedDiscipline][nextKey].project.projectTitle,
        key : nextKey
      },
      previous : {
        projectTitle : this.state.projects[this.state.currentlyDisplayedDiscipline][prevKey].project.projectTitle,
        key : prevKey
      }
    };
    browserHistory.push(location);
  }
};