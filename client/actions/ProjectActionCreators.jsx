import AppDispatcher from '../dispatcher/AppDispatcher';

const receieveProjects =  (projects) => {
  console.log('receviving projects');

  let action = {
    type: 'receive_projects',
    projects: projects
  };

  AppDispatcher.Dispatcher.dispatch(action);
};

const receieveContact =  (contact) => {
  console.log('receviving contact');

  let action = {
    type: 'receive_contact',
    contact: contact
  };

  AppDispatcher.Dispatcher.dispatch(action);
};

const receieveAbout =  (about) => {
  console.log('receviving about');

  let action = {
    type: 'receive_about',
    about: about
  };

  AppDispatcher.Dispatcher.dispatch(action);
};

export default { receieveProjects, receieveContact, receieveAbout };