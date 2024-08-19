const router = require('express').Router();

// Importing the User model
const User = require('./Models/User.cjs');

// express route to register a new user
export default UserRegistration = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(406).json({
            success: false,
            error: error.message,
        });
        console.error("UserRegistration:", error);
    }
}