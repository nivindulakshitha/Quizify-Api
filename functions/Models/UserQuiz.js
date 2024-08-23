import mongoose from "mongoose";

const UserQuizSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    quizId: {
        type: String,
        required: true,
    },
    answers: [
        {
            questionId: {
                type: String,
                required: true,
            },
            selectedOption: {
                type: Number,
                required: true,
            },
        },
    ],
    score: {
        type: Number,
        required: true,
    },
    quizTakenDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const UserQuiz = mongoose.model("UserQuiz", UserQuizSchema);
export default UserQuiz;