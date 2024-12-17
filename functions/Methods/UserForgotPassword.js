import nodemailer from "nodemailer";
import User from "../Models/User.js";
import databaseConnector from "./DatabaseConnectoin.js";

export default async function UserForgotPassword(req, res) {
    const { email } = req.body;

    await databaseConnector(res);

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            code: 404,
            message: "User not found for given email",
        });
    }

    try {
        const code = await user.randomCode();

        const transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.RESET_EMAIL,
                pass: process.env.RESET_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.RESET_EMAIL,
            to: user.email,
            subject: "Quizify: Password Reset Code",
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #3366FF;">Quizify: Password Reset Code</h2>
            <p>Hello ${user.username},</p>
            <p>You requested a password reset. Please use the following code to reset your password:</p>
            <div style="font-size: 32px; font-weight: bold; color: #FF5733; letter-spacing: 5px;">${code}</div>
            <p>If you did not request a password reset, please ignore this email.</p>
            <br>
            <p>Thank you,</p>
            <p>The Quizify Team</p>
        </div>
    `,
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({
                    success: false,
                    error: error.message,
                    code: error.code,
                    message: "Failed to send code to your email",
                });
                console.error("UserForgotPassword:", error);
            } else {
                console.log("Message sent: %s", info.messageId);
                res.status(200).json({
                    success: true,
                    message: `Code sent to your email ${user.email}`,
                });
            }
        });
    } catch (error) {
        res.status(406).json({
            success: false,
            error: error.message,
            code: error.code,
            message: "Failed to send code to your email",
        });
        console.error("UserForgotPassword:", error);
    }
}
