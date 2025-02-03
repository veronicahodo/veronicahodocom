import { jwtDecode } from "jwt-decode";
import { FormEvent, useEffect, useState } from "react";
import { DataJwt, DefaultDataJwt } from "../../../models/DataJwt";
import {
    DataBlogPost,
    DefaultDataBlogPost,
} from "../../../models/DataBlogPost";
import axios from "axios";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

interface PageProps {
    apiUrl: string;
    throwError: (code: number, message: string, link: string) => void;
}

const PageBlogPost = ({ apiUrl, throwError }: PageProps) => {
    const token = localStorage.getItem("token");
    const [show, setShow] = useState<boolean>(false);
    const [workingPost, setWorkingPost] =
        useState<DataBlogPost>(DefaultDataBlogPost);
    const [status, setStatus] = useState<string>("");
    const [tagString, setTagString] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        axios
            .post(
                `${apiUrl}/v1/blog`,
                { ...workingPost, tags: tagString.split(",") },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                if (res.status === 201) {
                    setStatus("Post created successfully");
                    setWorkingPost(DefaultDataBlogPost);
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
    };

    useEffect(() => {
        let jwt: DataJwt = DefaultDataJwt;
        if (!token || token.length < 1)
            throwError(401, "Unauthorized, please log in again", "/login");
        try {
            jwt = jwtDecode(token ?? "");
            if (!jwt.roles.includes("admin")) throwError(403, "Forbidden", "/");
            setShow(true);
        } catch (error) {
            console.log(error);
            throwError(401, "Unauthorized, please log in again", "/login");
        }
    }, [token, throwError]);

    if (!show) return <></>;

    return (
        <>
            {show && (
                <>
                    <h1>Create Blog Post</h1>
                    {status && <Alert variant="warning">{status}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col className="mb-2">
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={workingPost.title}
                                        onChange={(e) =>
                                            setWorkingPost({
                                                ...workingPost,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-2">
                                <Form.Group controlId="formPayload">
                                    <Form.Label>Payload</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={10}
                                        value={workingPost.payload}
                                        onChange={(e) =>
                                            setWorkingPost({
                                                ...workingPost,
                                                payload: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-2">
                                <Form.Group controlId="formTags">
                                    <Form.Label>Tags</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={tagString}
                                        onChange={(e) =>
                                            setTagString(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mb-3">
                                <Form.Group controlId="formSlug">
                                    <Form.Label>Slug</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={workingPost.slug}
                                        onChange={(e) =>
                                            setWorkingPost({
                                                ...workingPost,
                                                slug: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end">
                                <Button
                                    variant="secondary"
                                    type="reset"
                                    className="me-2"
                                >
                                    Reset
                                </Button>
                                <Button variant="orange" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </>
            )}
        </>
    );
};

export default PageBlogPost;
