import express from "express";
import entries from "../controllers/entriesController";
import entry from "../controllers/entryController.js";
const router = express.Router();

router.get("/:userId/entries/:entryId", entry);
router.get("/:userId/entries", entries);

export default router;