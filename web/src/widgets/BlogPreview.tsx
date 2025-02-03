import { DataBlogPost } from "../models/DataBlogPost";

interface WidgetProps {
    post: DataBlogPost;
}

const BlogPreview = ({ post }: WidgetProps) => {
    const created = new Date(post.created);
    if (!post) return <></>;
    return (
        <>
            <a href={`/blog/${post.slug}`} style={{}}>
                <h2>{post.title}</h2>
            </a>
            <p className="text-muted" style={{ fontSize: "12px" }}>
                {created.toLocaleString()}
            </p>
            <p>{post.payload.split("#!break#")}</p>
        </>
    );
};

export default BlogPreview;
