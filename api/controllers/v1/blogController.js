import log from "../../tools/logger.js";
import { createBlogPost } from "../../services/v1/blogService.js";

export const postBlogPost = async (req, res) => {
    if (req.user === null)
        return res.status(401).json({ error: "Unauthorized" });

    const { title, payload, tags, slug } = req.body;

    const blogPost = {
        author_id: req.user.id,
        title,
        payload,
        tags,
        slug,
    };

    try {
        const newBlogPost = await createBlogPost(blogPost);
        log(
            "info",
            "blogController.postBlogPost",
            `Blog post ${newBlogPost.id} created`,
            req.user.id ?? "",
            req.ip
        );
        res.status(201).json({ post: newBlogPost });
    } catch (error) {
        log(
            "error",
            "blogController.postBlogPost",
            error.message,
            req.user !== null ? req.user.id : "",
            req.ip
        );
        res.status(500).json({ error: error.message });
    }
};
