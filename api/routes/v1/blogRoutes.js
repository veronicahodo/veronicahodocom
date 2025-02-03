import express from "express";
import {
    postBlogPost,
    getLatestPosts,
} from "../../controllers/v1/blogController.js";
import { authenticate } from "../../middleware/auth.js";

const router = express.Router();

router.get("/latest/:count", authenticate, getLatestPosts);

router.post("/", authenticate, postBlogPost);

export default router;
