import { useState } from "react";

const NavBar = () => {
    const aStyle = {
        fontSize: "20px",
        fontFamily: "'CaptureIt','Segoe UI',sans-serif",
        textDecoration: "none",
        color: "#eb721c",
        padding: "0 15px",
        transition: "background-color 0.2s, color 0.2s",
    };

    const aHoverStyle = {
        ...aStyle,
        color: "white",
        backgroundColor: "#eb721c",
    };

    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const createNavLink = (text: string, link: string) => (
        <a
            href={link}
            style={hoveredLink === text ? aHoverStyle : aStyle}
            onMouseEnter={() => setHoveredLink(text)}
            onMouseLeave={() => setHoveredLink(null)}
        >
            {text}
        </a>
    );

    return (
        <div className="m-2 d-flex flex-wrap justify-content-center align-items-center">
            {createNavLink("Home", "/")}
            {createNavLink("About", "/about")}
            {createNavLink("Blog", "/blog")}
            {createNavLink("Projects", "/projects")}
            {createNavLink("Contact", "/contact")}
        </div>
    );
};

export default NavBar;
