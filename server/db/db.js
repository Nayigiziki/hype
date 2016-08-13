var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    project: {
        projectTitle: String,
        projectDescription: String,
        projectClient: String,
        projectDiscipline: String,
        projectCollaborators: String,
        projectYear: Number,
        projectCreationDate: {
            type: Date,
            default: Date.now
        },
        projectDetails: String,
        projectUrl: String,
        projectImageUrls: Array
    }
});

var userSchema = new Schema({
    username: String,
    password: String,
});
var aboutSchema = new Schema({
    aboutContent: String,
    links: Array
});
var contactSchema = new Schema({
    contactContent: String
});

module.exports = {
    projectModel: mongoose.model('Project', projectSchema),
    userModel: mongoose.model('User', userSchema),
    aboutModel: mongoose.model('About', aboutSchema),
    contactModel: mongoose.model('Contact', contactSchema)
};