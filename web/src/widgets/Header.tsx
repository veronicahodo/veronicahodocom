import { jwtDecode } from "jwt-decode";
import { DataJwt } from "../models/DataJwt";
import { useState } from "react";

const Header = () => {
    const jwt: DataJwt = jwtDecode(localStorage.getItem("token") ?? "");
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const handleProfileClick = () => {
        console.log("Profile Clicked");
        setShowProfileMenu(!showProfileMenu);
    };

    const style = {
        menuLink: {
            textDecoration: "none",
            color: "#eb721c",
            display: "block",
            padding: "8px",
        },
        menuHover: {
            textDecoration: "none",
            color: "white",
            backgroundColor: "#eb721c",
            display: "block",
            padding: "8px",
            borderRadius: "4px",
        },
    };

    const createMenuItem = (text: string, link: string) => {
        return (
            <div
                onMouseEnter={() => setHoveredItem(text)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                <a
                    href={link}
                    style={
                        hoveredItem === text ? style.menuHover : style.menuLink
                    }
                >
                    {text}
                </a>
            </div>
        );
    };

    return (
        <div className="m-2 d-flex justify-content-between align-items-center">
            <a href="/">
                <img src="img/vh.png" alt="Veronica Hodo" />
            </a>
            {/* Wrap profile picture and menu in a container */}
            <div style={{ position: "relative" }}>
                <span
                    className="me-3"
                    style={{ cursor: "pointer" }}
                    onClick={handleProfileClick}
                >
                    <img
                        style={{ borderRadius: "50%" }}
                        src={jwt.pic ?? "img/default.jpg"}
                        alt="User Pic"
                        height={48}
                        width={48}
                    />
                </span>
                {showProfileMenu && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%", // Position it right below the profile picture
                            left: "50%", // Center it under the profile pic
                            transform: "translateX(-100%)",
                            width: "150px",
                            borderRadius: "7px",
                            backgroundColor:
                                (localStorage.getItem("theme") ?? "light") ===
                                "light"
                                    ? "white"
                                    : "black",
                            color:
                                (localStorage.getItem("theme") ?? "light") ===
                                "light"
                                    ? "black"
                                    : "white",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow for visibility
                            padding: "10px",
                            zIndex: 1000, // Ensure it appears above other content
                        }}
                    >
                        {createMenuItem("Settings", "/settings")}
                        {createMenuItem("Logout", "/logout")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
