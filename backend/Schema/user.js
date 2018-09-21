const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    userid: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String}
});

const User = mongoose.model('user', userSchema);


module.exports = User;