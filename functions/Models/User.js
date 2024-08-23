import mongoose from 'mongoose';
import bycrypt from 'bcryptjs';
import crypto from 'crypto';

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
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);

    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

UserSchema.methods.randomCode = async function () {
    const code = Math.floor(1000 + Math.random() * 9000);
    const resetToken = crypto.createHash('sha256').update(code.toString()).digest('hex')
    const tokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = tokenExpire;
    await this.save({ validateBeforeSave: false });

    return code;
}

const User = mongoose.model('User', UserSchema);
export default User;