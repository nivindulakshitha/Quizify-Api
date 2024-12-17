import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Helper function to generate a random 9-digit ID
const generateRandomId = async function () {
    let randomId;
    while (true) {
        // Generate a random 9-digit ID
        randomId = Math.floor(100000000 + Math.random() * 900000000).toString();

        // Check if the generated ID already exists in the database
        const existingQuiz = await mongoose.models.Quiz.findOne({ _id: randomId });
        if (!existingQuiz) {
            break;
        }
    }
    return randomId;
};

// Define the Quiz schema
const QuizSchema = new mongoose.Schema({
    _id: {
        type: String,
        unique: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
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
        default: '',
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
    },
    duration: {
        type: Number,
        required: true,
    },
    quizType: {
        type: String,
        required: true,
        default: "open",
    },
    shuffleQuestions: {
        type: Boolean,
        required: true,
        default: false,
    },
});

// Pre-save middleware to hash the password and generate a custom _id
QuizSchema.pre("save", async function (next) {
    // Generate a custom _id only if it's a new document
    if (this.isNew) {
        this._id = await generateRandomId();
    }

    // Hash the password if it is modified
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});

// Method to compare passwords
QuizSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;