import db from "../../db.js";
import { generateBase32String } from "../../tools/base32.js";

export const createBlogPost = async (blogPost) => {
    let attempts = 0;
    let done = false;
    let id = "";
    while (!done) {
        if (attempts > 1000) throw new Error("Too many attempts");
        id = "post_" + generateBase32String(16).toLowerCase();
        const existingPost = await db("blog_posts").where({ id }).first();
        if (!existingPost) done = true;
        attempts++;
    }

    blogPost.id = id;
    blogPost.created = new Date().getTime();
    blogPost.last_modified = new Date().getTime();
    blogPost.views = 0;

    await db("blog_posts").insert(blogPost);
    return await db("blog_posts").where({ id }).first();
};

export const retrieveBlogPost = async (postId) => {
    return await db("blog_posts").where({ id: postId }).first();
};

export const retrieveBlogPostsByRange = async (start, end) => {
    return await db("blog_posts")
        .whereBetween("created", [start, end])
        .orderBy("created", "desc");
};

export const retrieveBlogPostsByTag = async (tag) => {
    return await db("blog_posts")
        .where("tags", "like", "%" + tag + "%")
        .orderBy("created", "desc");
};

export const retrieveLatestBlogPosts = async (count, page = 1) => {
    const offset = (page - 1) * count;
    return await db("blog_posts")
        .orderBy("created", "desc")
        .offset(offset)
        .limit(count);
};

export const retrieveBlogPostBySlug = async (slug) => {
    return await db("blog_posts").where({ slug }).first();
};

export const updateBlogPost = async (postId, blogPost) => {
    await db("blog_posts").where({ id: postId }).update(blogPost);
    return await db("blog_posts").where({ id: postId }).first();
};

export const deleteBlogPost = async (postId) => {
    await db("blog_posts").where({ id: postId }).del();
};
