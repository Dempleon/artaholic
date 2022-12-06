const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    // todo: fill in
})
// todo: hooks
// todo: methods 

const User = model('User', userSchema);

module.exports = User;