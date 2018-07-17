import express from "express";
import entries from "../controllers/entriesController";
const router = express.Router();

router.get("/api/v1/users/:userId/entries/", entries);

export default router;