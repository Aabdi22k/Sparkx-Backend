import express from "express";
import { sendMessage, getMessages } from "../controllers/message.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.post("/send/:id", authorize, sendMessage);
router.get("/:id", authorize, getMessages);

export default router;
