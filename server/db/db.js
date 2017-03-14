var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    events: {
        name: String,
        people: Array
    }
});

module.exports = {
    userModel: mongoose.model('User', userSchema),
};