import express from "express";
import entries from "../controllers/entriesController";
import entry from "../controllers/entryController";
import addEntry from "../controllers/addEntryController";
import modifyEntry from "../controllers/modifyEntryController";
import getNotifies from "../controllers/getNotificationsController";
import getNotify from "../controllers/getANotificationController.js";

const router = express.Router();

router.get("/:userId/entries/:entryId", entry);
router.get("/:userId/entries", entries);
router.get("/:userId/notifications/:notifyId", getNotify);
router.get("/:userId/notifications", getNotifies);
router.post("/:userId/entries", addEntry);
router.put("/:userId/entries/:entryId", modifyEntry);

export default router;