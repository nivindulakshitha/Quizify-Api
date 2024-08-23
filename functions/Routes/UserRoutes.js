import { Router } from "express";
import UserRegistration from "../Methods/UserRegistration.js";
import UserForgotPassword from "../Methods/UserForgotPassword.js";

const userRouter = Router();

console.log(typeof UserRegistration, typeof UserForgotPassword)

console.log("UserRegistration:", UserRegistration);
console.log("UserForgotPassword:", UserForgotPassword);

userRouter.post("/register", UserRegistration);
userRouter.post("/forgot-password", UserForgotPassword)

export default userRouter;