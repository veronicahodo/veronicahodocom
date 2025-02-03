import express from "express";
import { postUser } from "../../controllers/v1/userController.js";

const router = express.Router();

router.post("/", postUser);

export default router;
