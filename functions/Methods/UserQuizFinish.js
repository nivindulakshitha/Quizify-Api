import UserQuiz from "../Models/UserQuiz";

export default async function UserQuizFinish(req, res) {
    const { userId, quizId, answers, score } = req.body;

    try {
        const userQuiz = await UserQuiz.create({
            userId,
            quizId,
            answers,
            score,
        });

        res.status(201).json({ success: true, data: userQuiz });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}