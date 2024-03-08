import express from "express";
import { getUsers, getUser } from "../controllers/user.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.get("/all", authorize, getUsers);
router.get("/", authorize, getUser);

export default router;
