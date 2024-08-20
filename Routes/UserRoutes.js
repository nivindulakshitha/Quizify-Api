import { Router } from "express";
import UserRegistration from "../Functions/UserRegistration.js";

const userRouter = Router();

userRouter.post("/register", UserRegistration);

export default userRouter;