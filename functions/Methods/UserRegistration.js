import User from '../Models/User.js';

export default async function UserRegistration(req, res) {
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
            password: user.matchPassword(password),
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(406).json({
            success: false,
            error: error.message,
            code: error.code,
            message: error.code === 11000 ? "Email already exists" : "Failed to register the user"
        });
        console.error("UserRegistration:", error);
    }
}