import log from "../../tools/logger.js";
import {
    createBlogPost,
    retrieveLatestBlogPosts,
    retrieveBlogPostBySlug,
} from "../../services/v1/blogService.js";

export const postBlogPost = async (req, res) => {
    if (req.user === null)
        return res.status(401).json({ error: "Unauthorized" });

    const { title, payload, tags, slug } = req.body;

    const blogPost = {
        author_id: req.user.id,
        title,
        payload,
        tags: tags.join(","),
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

export const getBlogPost = async (req, res) => {
    const { slug } = req.params;
    if (!slug) return res.status(400).json({ error: "Missing slug" });

    try {
        const post = await retrieveBlogPostBySlug(slug);
        if (!post) return res.status(404).json({ error: "Post not found" });
        log(
            "info",
            "blogController.getBlogPost",
            `Retrieved blog post ${post.id}`,
            req.user !== null ? req.user.id : "",
            req.ip
        );
        return res.status(200).json({ post });
    } catch (error) {
        log(
            "error",
            "blogController.getBlogPost",
            error.message,
            req.user !== null ? req.user.id : "",
            req.ip
        );
        return res.status(500).json({ error: error.message });
    }
};
