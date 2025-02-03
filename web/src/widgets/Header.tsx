import { jwtDecode } from "jwt-decode";
import { DataJwt } from "../models/DataJwt";

const Header = () => {
    const jwt: DataJwt = jwtDecode(localStorage.getItem("token") ?? "");
    return (
        <div className="d-flex justify-content-between align-items-center">
            <h1>Veronica Hodo</h1>
            <span>Hey, {jwt.first_name}!</span>
        </div>
    );
};

export default Header;
