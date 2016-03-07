var authentication = require('./controllers/authentication');
var db = require('./controllers/dbController');


var setup = function(app) {
    //need tests
    app.post('/api/register', authentication.signup);
    app.post('/api/login', authentication.login);
    app.get('/api/logout', authentication.logout);
    app.get('/api/isAuth', authentication.checkUser);

    //get projects
    app.get('/api/projects', function(req, res, next) {
        db.getAllProjectsFromDB(function(data) {
            if (!data) {
                res.status(400).json({
                    status: 'couldnt load the projects'
                })
            } else {
                res.status(200).json({
                    status: 'successfully fetched the from the db',
                    projects: data
                });
            }
        });
    });

    //create project
    app.post('/api/createProject', authentication.isAuth, function(req, res, next) {
        var projectObj = req.body;
        db.saveToDb(projectObj, function(err, createdProj) {
            if (!err) {
                res.status(201).json({
                    status: 'successfully added project to db',
                    project: createdProj
                });
            } else {
                res.status(400).json({
                    status: 'unsuccessfully added project to db'
                })
            }
        });
    });

    //delete projects
    app.post('/api/deleteProject', authentication.isAuth, function(req, res, next) {
        db.deleteProjectFromDb(req.body.id, function(err, deletedProject) {
            if (!err) {
                console.log('edited Project ', deletedProject);
                res.status(200).json({
                    status: 'successfully deleted project'
                })
            } else {
                console.log('err ', err);
                res.status(400).json({
                    status: 'unsuccessfully updated project',
                    err: err
                })
            }
        });
    });

    //update projects
    app.post('/api/editProject', function(req, res, next) {
        db.editProjectDb(req.body.id, req.body.project, function(err, editedProject) {
            if (!err) {
                console.log('edited Project ', editedProject);
                res.status(200).json({
                    status: 'successfully updated project',
                    project: editedProject
                })
            } else {
                console.log('err ', err);
                res.status(400).json({
                    status: 'unsuccessfully updated project',
                    err: err
                })
            }
        });
    });

    //edit/create contact data
    app.post('/api/about', function(req, res, next) {
        var abt = req.body;
        db.getAboutFromDB(function(err, about) {
            console.log('err ', err)
            console.log('about ', about)

            if (about.length === 0) {
                console.log('need to create about');

                db.saveAboutToDb({
                    content: abt.aboutContent,
                    links: abt.links
                }, function(err, aboutObj) {
                    console.log('err ', err);
                    if (!err) {
                        res.status(201).json({
                            status: 'successfully created About',
                            about: aboutObj
                        });
                    } else {
                        res.status(400).json({
                            status: 'unsuccessfully created About',
                            err: err
                        });
                    }
                })
            }

            if (about.length === 1) {
                console.log('only 1 about, get id and update');
                var id = about[0]._id;
                db.editAbout(id, {
                    aboutContent: abt.aboutContent,
                    links: abt.links
                }, function(err, aboutObj) {
                    if (!err) {
                        res.status(201).json({
                            status: 'successfully updated About',
                            about: aboutObj
                        });
                    } else {
                        res.status(400).json({
                            status: 'unsuccessfully updated About',
                            err: err
                        });
                    }
                })

            }
        })
    });

    app.get('/api/about', function(req, res, next) {
        db.getAboutFromDB(function(err, about) {
            if (!err) {
                res.status(200).json({
                    status: 'successfully fetched About',
                    about: about
                });
            } else {
                res.status(400).json({
                    status: 'unsuccessfully fetched About',
                    err: err
                });
            }
        })
    })

    app.post('/api/contact', function(req, res, next) {
        var contactInfo = req.body;
        console.log('contact info ', contactInfo);
        db.getContactFromDB(function(err, contact) {
            console.log('err ', err)
            console.log('contact ', contact)

            if (contact.length === 0) {
                console.log('need to create contact');

                db.saveContactToDb({
                    contactContent: contactInfo.contactContent
                }, function(err, contactObj) {
                    console.log('err ', err);
                    if (!err) {
                        res.status(201).json({
                            status: 'successfully created contact',
                            contact: contactObj
                        });
                    } else {
                        res.status(400).json({
                            status: 'unsuccessfully created contact',
                            err: err
                        });
                    }
                })
            }

            if (contact.length === 1) {
                console.log('only 1 contact, get id and update');
                var id = contact[0]._id;
                db.editContact(id, {
                    contactContent: contactInfo.contactContent
                }, function(err, contactObj) {
                    if (!err) {
                        res.status(201).json({
                            status: 'successfully updated contact',
                            contact: contactObj
                        });
                    } else {
                        res.status(400).json({
                            status: 'unsuccessfully updated contact',
                            err: err
                        });
                    }
                })

            }
        })
    });

    app.get('/api/contact', function(req, res, next) {
        db.getContactFromDB(function(err, contact) {
            if (!err) {
                res.status(200).json({
                    status: 'successfully fetched contact',
                    contact: contact
                });
            } else {
                res.status(400).json({
                    status: 'unsuccessfully fetched contact',
                    err: err
                });
            }
        })
    })




};

module.exports.setup = setup;