import mongoose from "mongoose";
import bycrypt from "bcryptjs";

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
            },
            options: [
                {
                    number: {
                        type: Number,
                        required: true,
                    },
                    option: {
                        type: String,
                        required: true,
                    }
                },
            ],
            correctOption: {
                type: Number,
                required: true,
            },
        },
    ],
    password: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    link: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    questionsType: {
        type: String,
        required: true,
        default: "multiple",
    },
    shuffleQuestions: {
        type: Boolean,
        required: true,
        default: false,
    },
});

QuizSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);

    next();
})

QuizSchema.methods.matchPassword = async function (enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
}

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;