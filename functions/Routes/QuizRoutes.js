import {Router} from "express";
import QuizCreate from "../Methods/QuizCreate.js";
import UserQuizFinish from "../Methods/UserQuizFinish.js";
import generateQuizHTML from "../Methods/QuizOpen.js";
import quizMatchPasswords from "../Methods/QuizMatchPasswords.js";

const quizRouter = Router();

quizRouter.post("/create", QuizCreate);
quizRouter.post("/match-passwords", quizMatchPasswords);
quizRouter.post("/finish", UserQuizFinish);
quizRouter.get("/take/:id", generateQuizHTML);

export default quizRouter;