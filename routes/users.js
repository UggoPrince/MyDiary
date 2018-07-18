import express from "express";
import entries from "../controllers/entriesController";
const router = express.Router();

router.get("/:userId/entries", entries);

export default router;