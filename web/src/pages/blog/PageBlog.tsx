import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DataBlogPost } from "../../models/DataBlogPost";

interface PageProps {
    apiUrl: string;
    throwError: (code: number, message: string, link: string) => void;
}

const PageBlog = ({ apiUrl, throwError }: PageProps) => {
    const { post } = useParams();
    const [activePost, setActivePost] = useState<DataBlogPost>();

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
    }, [apiUrl, throwError, post]);

    return <>{activePost?.author_id}</>;
};

export default PageBlog;
