import express from "express";
import getEntries from "../controllers/getEntriesController";
import getAnEntry from "../controllers/getAnEntryController";
import addEntry from "../controllers/addEntryController";
import modifyEntry from "../controllers/modifyEntryController";

let getEntriesRouter = express.Router();

getEntriesRouter.get("/entries", getEntries);
getEntriesRouter.get("/entries/:entryId", getAnEntry);
getEntriesRouter.post("/entries", addEntry);
getEntriesRouter.put("/entries/:entryId", modifyEntry);


export default getEntriesRouter;