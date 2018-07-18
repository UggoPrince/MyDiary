import express from "express";
import entry from "../controllers/entryController";
const router = express.Router();

router.get("/:userId/entries/:entryId", entry);

export default router;