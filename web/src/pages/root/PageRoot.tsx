import { useEffect, useState } from "react";
import { DataBlogPost } from "../../models/DataBlogPost";
import axios from "axios";
import BlogPreview from "../../widgets/BlogPreview";

interface PageProps {
    apiUrl: string;
    throwError: (code: number, message: string, link: string) => void;
}

const PageRoot = ({ apiUrl, throwError }: PageProps) => {
    const [posts, setPosts] = useState<DataBlogPost[]>([]);

    useEffect(() => {
        axios
            .get(`${apiUrl}/v1/blog/latest/3`)
            .then((res) => {
                if (res.status === 200) {
                    setPosts(res.data.posts);
                } else {
                    throwError(res.status, res.data.error, "");
                }
            })
            .catch((error) => {
                throwError(
                    error.response.status,
                    error.response.data.error,
                    ""
                );
            });
    }, [apiUrl, throwError]);

    return (
        <>
            <h1>Welcome</h1>
            <img src="/img/border1.png" />
            {posts.map((post) => (
                <BlogPreview key={post.id} post={post} />
            ))}
            <img src="/img/border1.png" />
        </>
    );
};

export default PageRoot;
