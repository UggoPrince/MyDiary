import express from "express";
import entries from "../controllers/entriesController";
import entry from "../controllers/entryController";
import addEntry from "../controllers/addEntryController";
const router = express.Router();

router.get("/:userId/entries/:entryId", entry);
router.get("/:userId/entries", entries);
router.post("/:userId/entries", addEntry);

export default router;