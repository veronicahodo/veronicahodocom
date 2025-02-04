import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import Border from "../../widgets/Border";
import { FormEvent, useEffect, useState } from "react";
import { DataUser, DefaultDataUser } from "../../models/DataUser";
import axios from "axios";

interface PageProps {
    apiUrl: string;
    throwError: (code: number, message: string, link: string) => void;
}

const PageSettings = ({ apiUrl, throwError }: PageProps) => {
    const [workingUser, setWorkingUser] = useState<DataUser>(DefaultDataUser);
    const [status, setStatus] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        axios
            .put(
                `${apiUrl}/v1/user/me`,
                {
                    first_name: workingUser.first_name,
                    last_name: workingUser.last_name,
                    display_name: workingUser.display_name,
                    theme: workingUser.theme,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200) {
                    setStatus("Settings saved successfully");
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

    const handleChange = (key: keyof DataUser, value: number | string) => {
        setWorkingUser({
            ...workingUser,
            [key]: value,
        });
    };

    useEffect(() => {
        axios
            .get(`${apiUrl}/v1/user/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setWorkingUser(res.data.user);
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
            <h1>Settings</h1>
            <Border />
            <div className="m-4">
                {status && <Alert variant="primary">{status}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>First Name:</Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <Form.Group controlId="formFirstName">
                                <Form.Control
                                    type="text"
                                    value={workingUser?.first_name ?? ""}
                                    onChange={(e) =>
                                        handleChange(
                                            "first_name",
                                            e.target.value
                                        )
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col>Last Name:</Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <Form.Group controlId="formLastName">
                                <Form.Control
                                    type="text"
                                    value={workingUser?.last_name ?? ""}
                                    onChange={(e) =>
                                        handleChange(
                                            "last_name",
                                            e.target.value
                                        )
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col>Display Name:</Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <Form.Group controlId="formDisplayName">
                                <Form.Control
                                    type="text"
                                    value={workingUser?.display_name ?? ""}
                                    onChange={(e) =>
                                        handleChange(
                                            "display_name",
                                            e.target.value
                                        )
                                    }
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Row>
                        <Col>Color Scheme:</Col>
                        <Col className="mb-3 d-flex justify-content-end align-items-center">
                            <Form.Group controlId="formColorScheme">
                                <Form.Select
                                    value={workingUser?.theme ?? ""}
                                    onChange={(e) => {
                                        document.documentElement.setAttribute(
                                            "data-theme",
                                            e.target.value
                                        );
                                        document.documentElement.setAttribute(
                                            "data-bs-theme",
                                            e.target.value
                                        );
                                        localStorage.setItem(
                                            "theme",
                                            e.target.value
                                        );
                                        handleChange("theme", e.target.value);
                                    }}
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-end">
                            <Button variant="orange" type="submit">
                                Save Changes
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Border />
        </>
    );
};

export default PageSettings;
