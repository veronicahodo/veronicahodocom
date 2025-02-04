import express from "express";
import {
    postUser,
    postUserAuth,
    getMe,
    getUser,
    putSettings,
} from "../../controllers/v1/userController.js";
import { authenticate } from "../../middleware/auth.js";

const router = express.Router();

router.get("/me", authenticate, getMe);
router.get("/:userId", authenticate, getUser);

router.post("/auth", postUserAuth);
router.post("/", postUser);

router.put("/me", authenticate, putSettings);

export default router;
