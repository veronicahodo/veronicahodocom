import express from "express";
import { postUser, postUserAuth } from "../../controllers/v1/userController.js";

const router = express.Router();

router.post("/auth", postUserAuth);
router.post("/", postUser);

export default router;
