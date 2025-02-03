import axios from "axios";
import { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

interface PageProps {
    apiUrl: string;
    throwError: (code: number, message: string, link: string) => void;
}

const PageLogin = ({ apiUrl, throwError }: PageProps) => {
    const nav = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        axios
            .post(`${apiUrl}/v1/user/auth`, {
                email,
                password,
            })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data.token);
                    nav("/");
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

    return (
        <>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="mb-2">
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-3">
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
    );
};

export default PageLogin;
