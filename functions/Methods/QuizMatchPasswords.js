import Quiz from "../Models/Quiz";
import databaseConnector from "./DatabaseConnectoin";

export default async function quizMatchPasswords(req, res) {
    const { quizId, password } = req.body;

    try {
        await databaseConnector(res);

        const quiz = await Quiz.findOne({ _id: quizId });

        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found." });
        }

        const isPasswordMatched = await quiz.matchPassword(password);

        if (isPasswordMatched === false) {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }

        res.status(200).json({ success: true, message: "Password matched." });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}