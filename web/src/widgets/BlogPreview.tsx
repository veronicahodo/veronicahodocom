import Markdown from "react-markdown";
import { DataBlogPost } from "../models/DataBlogPost";
import remarkGfm from "remark-gfm";

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
            <Markdown remarkPlugins={[remarkGfm]}>
                {post.payload.split("#!break#")[0]}
            </Markdown>
        </>
    );
};

export default BlogPreview;
