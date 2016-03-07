var mongoose = require('mongoose');
var ProjectModel = require('../db/db').projectModel;
var AboutModel = require('../db/db').aboutModel;
var ContactModel = require('../db/db').contactModel;

var saveToDb = function(project, cb) {
    var newProject = new ProjectModel({
        project: project
    });
    newProject.save(function(err, newProj) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('successfully saved Project ');
        }
        cb(err, newProj);
    })
}

var getProjectFromDb = function(id, cb) {
    ProjectModel.findOne({
        _id: id
    }, function(err, proj) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('found project');
            console.log(proj);
        }
        cb(err, proj);
    })
}

var getAllProjectsFromDB = function(cb) {
    ProjectModel.find({}, function(err, projs) {
        if (err) {
            console.log('err ', err);
            cb(false)
        } else {
            console.log('found project results ', projs);
            cb(projs);
        }
    })
}

var editProjectDb = function(id, projectObj, cb) {
    ProjectModel.update({
        _id: id
    }, {
        $set: {
            project: projectObj
        }
    }, function(err, proj) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('successfully edited Project ');
        }
        cb(err, proj);
    });
}


var deleteProjectFromDb = function(id, cb) {
    ProjectModel.findOne({
        _id: id
    }).remove(function(err, obj) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('success');
        }
        cb(err, obj);
    })

}

var deleteAllProjectsFromDb = function(cb) {
    ProjectModel.remove(function(err, obj) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('success');
        }
        cb(err, obj);
    })
}

var getAboutFromDB = function(cb) {
    AboutModel.find({}, function(err, about) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('found about results ', about);
        }
        cb(err, about);
    })
}

var saveAboutToDb = function(aboutObj, cb) {
    var newAbout = new AboutModel({
        aboutContent: aboutObj.content,
        links: aboutObj.links
    });
    newAbout.save(function(err, newAboutObj) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('successfully saved Project ', newAboutObj);
        }
        cb(err, newAboutObj);
    })
}

var editAbout = function(id, aboutObj, cb) {
    AboutModel.update({
        _id: id
    }, {
        $set: {
            aboutContent: aboutObj.aboutContent,
            links: aboutObj.links
        }
    }, function(err, abt) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('successfully edited about ', abt);
        }
        cb(err, abt);
    });
}

var getContactFromDB = function(cb) {
    ContactModel.find({}, function(err, contact) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('found conact results ', contact);
        }
        cb(err, contact);
    })
}

var saveContactToDb = function(contactObj, cb) {
    var newContact = new ContactModel({
        contactContent: contactObj.contactContent
    });
    newContact.save(function(err, newContactObj) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('successfully saved contact ', newContactObj);
        }
        cb(err, newContactObj);
    })
}

var editContact = function(id, contactObj, cb) {
    ContactModel.update({
        _id: id
    }, {
        $set: {
            contactContent: contactObj.contactContent
        }
    }, function(err, contact) {
        if (err) {
            console.log('err ', err);
        } else {
            console.log('successfully edited contact ', contact);
        }
        cb(err, contact);
    });
}



module.exports = {
    saveToDb: saveToDb,
    getProjectFromDb: getProjectFromDb,
    getAllProjectsFromDB: getAllProjectsFromDB,
    editProjectDb: editProjectDb,
    deleteProjectFromDb: deleteProjectFromDb,
    deleteAllProjectsFromDb: deleteAllProjectsFromDb,
    getAboutFromDB: getAboutFromDB,
    saveAboutToDb: saveAboutToDb,
    editAbout: editAbout,
    getContactFromDB: getContactFromDB,
    saveContactToDb: saveContactToDb,
    editContact: editContact
};