import Quiz from "../Models/Quiz";
import databaseConnector from "./DatabaseConnectoin";

export default async function QuizCreate(req, res) {
    const { ownerId, name, questions, password, category, duration, quizType, shuffleQuestions } = req.body;

    try {
        await databaseConnector(res);
        
        const quiz = await Quiz.create({
            ownerId,
            name,
            questions,
            password,
            category,
            duration,
            quizType,
            shuffleQuestions,
        });

        quiz.link = `${req.headers.host}/quiz/${quiz._id}`;
        await quiz.save();

        res.status(201).json({ success: true, data: quiz });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};