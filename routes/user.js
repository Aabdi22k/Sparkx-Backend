import express from "express";
import { getUsers } from "../controllers/user.js";
import authorize from "../middleware/authorize.js";

const router = express.Router();

router.get("/", authorize, getUsers);

export default router;
