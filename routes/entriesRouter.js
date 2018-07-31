import express from "express";
import getEntries from "../controllers/getEntriesController";

let getEntriesRouter = express.Router();

getEntriesRouter.get("/entries", getEntries);

export default getEntriesRouter;