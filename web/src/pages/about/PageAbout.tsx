import { Col, Row } from "react-bootstrap";

const PageAbout = () => {
    return (
        <>
            <h1>About</h1>
            <img style={{ maxWidth: "100%" }} src="/img/border1.png" />
            <div style={{ padding: "20px" }}>
                <Row>
                    <Col xs={12} md={8}>
                        <p>
                            Being a programmer is a fascinating journey of
                            problem-solving and creation. I thrive on the
                            challenge of crafting solutions that bring ideas to
                            life. Whether it’s coding a sleek web application or
                            automating repetitive tasks, the ability to turn
                            abstract concepts into functional systems is deeply
                            rewarding. The constant evolution of technology
                            keeps me on my toes, always learning and
                            experimenting with new tools and languages to stay
                            ahead in this ever-changing field.
                        </p>

                        <p>
                            In addition to programming, I have a passion for the
                            culinary arts. Cooking is my creative outlet, a way
                            to unwind and express myself through flavors and
                            presentation. The parallels between cooking and
                            programming often strike me—both require precision,
                            creativity, and a bit of improvisation. I enjoy
                            experimenting with recipes, blending traditional
                            techniques with modern twists, much like mixing
                            tried-and-true algorithms with cutting-edge tech.
                        </p>

                        <p>
                            Light has always fascinated me, both as an artistic
                            medium and a technical challenge. I love
                            experimenting with lighting setups, whether for
                            photography, videography, or enhancing the ambiance
                            of a space. It’s incredible how a well-placed light
                            can transform an environment or convey emotion in an
                            image. This interest often ties back to my
                            tech-savvy nature, as I delve into the technical
                            aspects of lighting, from LEDs to smart systems.
                        </p>

                        <p>
                            As a general tech enthusiast, I find joy in
                            exploring and tinkering with gadgets and systems.
                            From building custom PCs to integrating smart home
                            devices, I’m always looking for ways to push the
                            boundaries of what technology can do. I enjoy diving
                            into manuals, troubleshooting issues, and finding
                            innovative solutions that make life more efficient
                            or enjoyable. The thrill of understanding how
                            something works and making it work better never gets
                            old.
                        </p>

                        <p>
                            Ultimately, my diverse interests in programming,
                            cooking, lighting, and tech form a unique tapestry
                            that reflects who I am. These pursuits feed into
                            each other, enhancing my creativity and
                            problem-solving skills. Whether I’m debugging code,
                            plating a dish, setting up a lighting rig, or
                            exploring the latest tech trends, I approach each
                            with the same enthusiasm and curiosity. It’s this
                            blend of passions that keeps life exciting and full
                            of discovery.
                        </p>
                    </Col>
                    <Col>
                        <img src="/img/me.jpg" />
                    </Col>
                </Row>
            </div>
            <img style={{ maxWidth: "100%" }} src="/img/border1.png" />
        </>
    );
};

export default PageAbout;
