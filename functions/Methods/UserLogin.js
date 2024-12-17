import User from "../Models/User";
import databaseConnector from "./DatabaseConnectoin";

export default async function UserLogin(req, res) {
    const { email, password } = req.body;

    await databaseConnector(res);

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ 
            success: false,
            code: 404,
            message: "User not found for given email." 
        });
    }

    if (!user.matchPassword(password)) {
        return res.status(401).json({ 
            success: false,
            code: 401,
            message: "Incorrect password. Please try again." 
        });
    }

    return res.status(200).json({ 
        success: true,
        message: "User logged in successfully.",
        data: user
    });
}