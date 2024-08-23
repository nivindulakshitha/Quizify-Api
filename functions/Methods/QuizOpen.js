import Quiz from "../Models/Quiz";
import path from 'path';

export default async function (req, res) {
    const quizId = req.params.id;

    try {
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ success: false, message: "Quiz not found." });
        }

        res.status(200).send({
            success: true,
            data: quiz
        });

    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}