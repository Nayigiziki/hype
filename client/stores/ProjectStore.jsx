import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmiiter from 'events';
import assign from 'object-assign';
import _ from 'underscore';

var projects = null;
var contact = null;
var about = null;

var setProject = (receivedProjects) => {
  console.log('setting projects')
  projects = {
    projectReferences: setProjectReferences(receivedProjects),
    projects: sort(receivedProjects)
  };
  console.log('organized and sorted projects', Object.keys(projects.projectReferences), Object.keys(projects.projects));
}

var setContact = (inputContact) => {
  console.log('👍setting contact👍')
  contact = inputContact[0];
}

var setAbout = (inputAbout) => {
  console.log('👍setting about👍')
  about = inputAbout[0];
}

var setProjectReferences = (projects) => {
    return _.reduce(projects, (accumulator, project) => {
       accumulator[project.project.projectTitle] = {
          __v : project.__v,
          _id : project._id,
          project: project.project
        };
       return accumulator;
    }, {});
}

var sort = (projects) => {
    return _.reduce(projects, (accumulator, project)=>{
      if(accumulator[project.project.projectDiscipline] ===  undefined){
        accumulator[project.project.projectDiscipline] = [project];
      } else {
        accumulator[project.project.projectDiscipline].push(project);
      }
      return accumulator;
    }, {
      all : projects
    });
};

var emitChange = (evt) => {
  ProjectStore.emit('change '+ evt);
};

var ProjectStore = assign({}, EventEmiiter.prototype, {
  addChangeListener(callback){
    this.on('change projects', callback);
  },
  removeChangeListener(callback){
    this.removeListener(callback);
  },
  getProjects(){
    return projects;
  },
  getAbout(){
    return about;
  },
  getContact(){
    return contact;
  }
});

var handleAction = (action) => {
  if(action.type === 'receive_projects'){
    setProject(action.projects);
    emitChange('projects');
  }

  if(action.type === 'receive_contact'){
    setContact(action.contact);
    emitChange('contact');
  }

  if(action.type === 'receive_about'){
    setAbout(action.about);
    emitChange('about');
  }
}

ProjectStore.dispatchToken = AppDispatcher.Dispatcher.register(handleAction);

export default { ProjectStore };

