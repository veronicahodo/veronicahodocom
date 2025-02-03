import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DataBlogPost } from "../../models/DataBlogPost";
import BlogPreview from "../../widgets/BlogPreview";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { jwtDecode } from "jwt-decode";
import { DataJwt } from "../../models/DataJwt";
import { Button } from "react-bootstrap";
import Border from "../../widgets/Border";

interface PageProps {
    apiUrl: string;
    throwError: (code: number, message: string, link: string) => void;
}

const PageBlog = ({ apiUrl, throwError }: PageProps) => {
    const { post } = useParams();
    const [activePost, setActivePost] = useState<DataBlogPost>();
    const [posts, setPosts] = useState<DataBlogPost[]>([]);

    const numberToDate = (time: number) => {
        const date = new Date(time);
        return date.toLocaleString();
    };

    const isAdmin = () => {
        const token = localStorage.getItem("token");
        if (!token || token.length < 1) return false;
        try {
            const jwt: DataJwt = jwtDecode(token ?? "");
            if (!jwt.roles.includes("admin")) return false;
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    useEffect(() => {
        if (post)
            axios
                .get(`${apiUrl}/v1/blog/${post}`, {
                    params: {
                        t: Date.now(),
                    },
                })
                .then((res) => {
                    if (res.status === 200) {
                        setActivePost(res.data.post);
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
        else
            axios
                .get(`${apiUrl}/v1/blog/latest/10`, {
                    params: {
                        t: Date.now(),
                    },
                })
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
    }, [apiUrl, throwError, post]);

    return (
        <>
            {activePost && (
                <>
                    <h1>{activePost?.title}</h1>
                    <Border />
                    <div className="text-muted" style={{ fontSize: "12px" }}>
                        --==[ Created:{" "}
                        {numberToDate(
                            Number(activePost?.created ?? Date.now())
                        )}{" "}
                        - Last Modified:{" "}
                        {numberToDate(
                            Number(activePost?.last_modified ?? Date.now())
                        )}{" "}
                        ]==--
                    </div>
                    <div style={{ padding: "20px" }}>
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {activePost?.payload.split("#!break#").join("")}
                        </Markdown>
                    </div>
                    <Border />
                </>
            )}
            {posts.length > 0 && (
                <>
                    <h1>Blog</h1>
                    <Border />
                    {posts.map((post) => (
                        <BlogPreview key={post.id} post={post} />
                    ))}
                    <Border />
                </>
            )}
            <br />
            {isAdmin() && (
                <Button
                    variant="orange"
                    onClick={() => {
                        window.location.href = "/blog/post";
                    }}
                >
                    Create Blog Post
                </Button>
            )}
        </>
    );
};

export default PageBlog;
