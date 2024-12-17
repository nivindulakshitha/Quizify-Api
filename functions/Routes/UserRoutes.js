import { Router } from "express";
import UserLogin from "../Methods/UserLogin.js";
import UserRegistration from "../Methods/UserRegistration.js";
import UserForgotPassword from "../Methods/UserForgotPassword.js";

const userRouter = Router();

userRouter.post("/login", UserLogin);
userRouter.post("/register", UserRegistration);
userRouter.post("/forgot-password", UserForgotPassword)

export default userRouter;