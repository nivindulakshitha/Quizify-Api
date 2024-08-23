import Quiz from "../Models/Quiz";

export default async function QuizCreate(req, res) {
    const { name, questions, password, category, duration, questionsType, shuffleQuestions } = req.body;

    try {
        const quiz = await Quiz.create({
            name,
            questions,
            password,
            category,
            duration,
            questionsType,
            shuffleQuestions,
        });

        quiz.link = `${req.headers.host}/quiz/${quiz._id}`;
        await quiz.save();

        res.status(201).json({ success: true, data: quiz });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};