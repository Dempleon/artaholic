const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const cartSchema = new Schema({
    // todo: fill in
})

// todo: methods

const Cart = model('Cart', cartSchema);

module.exports = Cart;