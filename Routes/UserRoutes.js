import { Router } from "express";
import UserRegistration from "../Functions/UserRegistration.js";
import UserForgotPassword from "../Functions/UserForgotPassword.js";

const userRouter = Router();

userRouter.post("/register", UserRegistration);
userRouter.post("/forgot-password", UserForgotPassword)

export default userRouter;