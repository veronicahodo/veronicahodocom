import { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { DataUser, DefaultDataUser } from "../../models/DataUser";
import axios from "axios";
import Border from "../../widgets/Border";

interface PageProps {
    apiUrl: string;
    throwError: (code: number, message: string, link: string) => void;
}

const PageSignup = ({ apiUrl, throwError }: PageProps) => {
    const [workingUser, setWorkingUser] = useState<DataUser>(DefaultDataUser);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [done, setDone] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        axios
            .post(`${apiUrl}/v1/user`, {
                email: workingUser.email,
                password: password,
                first_name: workingUser?.first_name,
                last_name: workingUser?.last_name,
            })
            .then((res) => {
                if (res.status === 201) {
                    setDone(true);
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

    const handleUserChange = (key: keyof DataUser, value: number | string) => {
        setWorkingUser({
            ...workingUser,
            [key]: value,
        });
    };

    return (
        <>
            {!done && (
                <>
                    <h1>Signup</h1>
                    <Border />
                    <Form onSubmit={handleSubmit}>
                        <p>
                            To join my wonderful little site, please create your
                            account by filling out the following form.
                        </p>
                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-2"
                                    controlId="formFirstName"
                                >
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={workingUser?.first_name}
                                        onChange={(e) =>
                                            handleUserChange(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    className="mb-2"
                                    controlId="formLastName"
                                >
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={workingUser?.last_name}
                                        onChange={(e) =>
                                            handleUserChange(
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
                                <Form.Group
                                    className="mb-2"
                                    controlId="formEmail"
                                >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={workingUser.email}
                                        onChange={(e) =>
                                            handleUserChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group
                                    className="mb-2"
                                    controlId="formPassword"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group
                                    className="mb-2"
                                    controlId="formConfirmPassword"
                                >
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
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
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <Border />
                </>
            )}
            {done && (
                <>
                    <h1>Signup Successful!</h1>
                    <Border />
                    <p>
                        Your signup was submitted successfully and you should
                        have an email with instructions on completing your
                        setup.
                    </p>
                    <Border />
                </>
            )}
        </>
    );
};

export default PageSignup;
