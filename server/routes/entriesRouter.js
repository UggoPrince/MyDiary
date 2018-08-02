import express from "express";
import createTables from "../models/tables";
import {entriesCon} from "../controllers/EntriesController";

createTables();
let getEntriesRouter = express.Router();

getEntriesRouter.get("/entries", entriesCon.getEntries);
getEntriesRouter.get("/entries/:entryId", entriesCon.getAnEntry);
getEntriesRouter.post("/entries", entriesCon.addAnEntry);
getEntriesRouter.put("/entries/:entryId", entriesCon.modifyAnEntry);


export default getEntriesRouter;