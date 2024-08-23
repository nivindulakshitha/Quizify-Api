import nodemailer from 'nodemailer';
import User from '../Models/User.js';

export default async function UserForgotPassword(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ 
            success: false,
            code: 404,
            message: "User not found for given email" 
        });
    }

    try {
        const code = await user.randomCode();

        const transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "fotutilizationmonitor@gmail.com",
                pass: "imhm hbis uuvw ufxg"
            }
        });

        const mailOptions = {
            from: "fotutilizationmonitor@gmail.com",
            to: user.email,
            subject: 'Quizify: Password Reset Code',
            text: `Your password reset code is ${code}`
        }

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ 
                    success: false,
                    error: error.message,
                    code: error.code,
                    message: "Failed to send code to your email" 
                });
                console.error("UserForgotPassword:", error);
            } else {
                console.log('Message sent: %s', info.messageId);
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
            message: "Failed to send code to your email" 
        });
        console.error("UserForgotPassword:", error);
    }
}