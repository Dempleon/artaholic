const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const artSchema = new Schema({
    // todo: fill in
})

const Art = model('Art', artSchema);

module.exports = Art;