import log from "../../tools/logger.js";
import {
    createBlogPost,
    retrieveLatestBlogPosts,
} from "../../services/v1/blogService.js";

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
        return res.status(201).json({ post: newBlogPost });
    } catch (error) {
        log(
            "error",
            "blogController.postBlogPost",
            error.message,
            req.user !== null ? req.user.id : "",
            req.ip
        );
        return res.status(500).json({ error: error.message });
    }
};

export const getLatestPosts = async (req, res) => {
    const { count } = req.params;
    if (!count) return res.status(400).json({ error: "Missing count" });
    if (isNaN(count)) return res.status(400).json({ error: "Invalid count" });

    try {
        const posts = await retrieveLatestBlogPosts(count);
        log(
            "info",
            "blogController.getLatestPosts",
            `Retrieved ${posts.length} latest blog posts`,
            req.user !== null ? req.user.id : "",
            req.ip
        );
        res.status(200).json({ posts });
    } catch (error) {}
};
