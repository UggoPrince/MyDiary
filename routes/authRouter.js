import express from "express";
import authSignup from "../controllers/signupController";
import authLogin from "../controllers/loginController";

let signupRouter = express.Router();

signupRouter.post("/auth/signup", authSignup);
signupRouter.post("/auth/login", authLogin);

export default signupRouter;