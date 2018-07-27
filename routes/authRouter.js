import express from "express";
import authSignup from "../controllers/signupController";

let signupRouter = express.Router();
const signupAuth = new authSignup();

signupRouter.post("/auth/signup", signupAuth.signup);

export default signupRouter;