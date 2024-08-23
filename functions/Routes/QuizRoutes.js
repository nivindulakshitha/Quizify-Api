import {Router} from "express";
import QuizCreate from "../Methods/QuizCreate.js";
import UserQuizFinish from "../Methods/UserQuizFinish.js";
import generateQuizHTML from "../Methods/QuizOpen.js";

const quizRouter = Router();

quizRouter.post("/create", QuizCreate);
quizRouter.post("/finish", UserQuizFinish);
quizRouter.get("/take/:id", generateQuizHTML);

export default quizRouter;