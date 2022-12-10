const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    // todo: fill in
    art: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Art'
        }
    ]
})

// todo: methods
cartSchema.virtual("cartTotal").get(function () {
// todo: complete virtual to get cart total
}) 

const Cart = model('Cart', cartSchema);

module.exports = Cart;