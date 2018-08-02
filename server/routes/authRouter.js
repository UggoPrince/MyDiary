import express from "express";
import {createTables} from "../models/tables";
import {authenticate} from "../controllers/UsersController";

createTables();
let signupRouter = express.Router();

signupRouter.post("/auth/signup", authenticate.signUp);
signupRouter.post("/auth/login", authenticate.signIn);

export default signupRouter;