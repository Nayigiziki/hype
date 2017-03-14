import AppDispatcher from '../dispatcher/AppDispatcher';
import EventEmiiter from 'events';
import assign from 'object-assign';
import _ from 'underscore';

var projects = null;

var setProject = (receivedProjects) => {
  console.log('setting projects')
  projects = {
    projectReferences: setProjectReferences(receivedProjects),
    projects: sort(receivedProjects)
  };
  console.log('organized and sorted projects', Object.keys(projects.projectReferences), Object.keys(projects.projects));
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
  }
});

var handleAction = (action) => {
  if(action.type === 'receive_projects'){
    setProject(action.projects);
    emitChange('projects');
  }
}

ProjectStore.dispatchToken = AppDispatcher.Dispatcher.register(handleAction);

export default { ProjectStore };

