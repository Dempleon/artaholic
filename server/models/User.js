const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    arts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Art',
        }
    ],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
})

// todo: hooks
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});


// todo: methods 
userSchema.methods.checkPassword = async function (password) {
    return bcrypt .compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;