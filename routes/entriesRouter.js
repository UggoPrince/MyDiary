import express from "express";
import getEntries from "../controllers/getEntriesController";
import getAnEntry from "../controllers/getAnEntryController";

let getEntriesRouter = express.Router();

getEntriesRouter.get("/entries", getEntries);
getEntriesRouter.get("/entries/:entryId", getAnEntry);

export default getEntriesRouter;