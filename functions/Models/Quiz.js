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
                    },
                    isCorrect: {
                        type: Boolean,
                        required: true,
                        default: false,
                    },
                },
            ],
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
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        default: this.questions.length * 60,
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