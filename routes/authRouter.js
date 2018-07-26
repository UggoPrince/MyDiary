import express from "express";
import signup from "../controllers/signupController";

let signupRouter = express.Router();

signupRouter.post("/auth/signup", signup);

export default signupRouter;