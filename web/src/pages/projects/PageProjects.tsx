import { Col, Row } from "react-bootstrap";
import Border from "../../widgets/Border";

const PageProjects = () => {
    return (
        <>
            <h1>Projects</h1>
            <Border />
            <div style={{ padding: "20px" }}>
                <Row>
                    <Col>
                        <div className="text-center">
                            <h3>This Site</h3>
                        </div>
                        <p>
                            This site of course was made from the ground up with
                            opensource technologies.
                        </p>
                        <div className="text-center">
                            [{" "}
                            <a
                                target="_blank"
                                href="https://github.com/veronicahodo/veronicahodocom"
                            >
                                GitHub
                            </a>{" "}
                            ] [{" "}
                            <a href="/blog/tags/project:veronicahodocom">
                                Blog
                            </a>{" "}
                            ]
                        </div>
                    </Col>
                    <Col>
                        <div className="text-center">
                            <h3>eMotor Center</h3>
                        </div>
                        <p>
                            The centeral network for finding new, surplus, and
                            refurbished general purpose electric motors.
                        </p>
                        <div className="text-center">
                            [{" "}
                            <a target="_blank" href="https://emotor.center">
                                Website
                            </a>{" "}
                            ] [ <a href="/blog/tags/project:emotor">Blog</a> ]
                        </div>
                    </Col>
                </Row>
            </div>
            <Border />
        </>
    );
};

export default PageProjects;
