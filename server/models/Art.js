const { Schema, model } = require('mongoose');

const artSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true
    },
    image: {
        type: String,
        required: true,
        match: [/.+\.(png|svg|jpg|jpeg|gif)/, 'Must be image']
    },
    description: {
        type: String
    },
    onsale: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    category: {
        type: String
    }
})

const Art = model('Art', artSchema);

module.exports = Art;