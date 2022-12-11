const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const orderSchema = new Schema({
    // todo: fill in
    purchaseDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    arts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Art'
        }
    ]
})

// todo: methods
orderSchema.virtual("orderTotal").get(function () {
// todo: complete virtual to get cart total
}) 

const Order = model('Order', orderSchema);

module.exports = Order;