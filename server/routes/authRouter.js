import express from "express";
import {authenticate} from "../controllers/UsersController";

let signupRouter = express.Router();

signupRouter.post("/auth/signup", authenticate.signUp);
signupRouter.post("/auth/login", authenticate.signIn);

export default signupRouter;