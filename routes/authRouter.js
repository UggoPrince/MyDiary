import express from "express";
import authSignup from "../controllers/signupController";

let signupRouter = express.Router();

signupRouter.post("/auth/signup", authSignup);

export default signupRouter;