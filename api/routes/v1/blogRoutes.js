import express from "express";
import { postBlogPost } from "../../controllers/v1/blogController.js";
import { authenticate } from "../../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, postBlogPost);

export default router;
