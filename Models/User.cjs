const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bycrypt.genSalt(10);
    this.password = bycrypt.hash(this.password, salt);

    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;