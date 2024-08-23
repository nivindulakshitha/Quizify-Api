import {Router} from "express";
import QuizCreate from "../Methods/QuizCreate.js";

const quizRouter = Router();

quizRouter.post("/create", QuizCreate);

export default quizRouter;