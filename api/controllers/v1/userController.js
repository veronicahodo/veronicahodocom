import log from "../../tools/logger.js";
import jwt from "jsonwebtoken";
import {
    createUser,
    createUserInfo,
    authenticateUser,
} from "../../services/v1/userService.js";

export const postUser = async (req, res) => {
    console.log("????");
    const { email, password, first_name, last_name, display_name } = req.body;

    try {
        const user = await createUser({
            email,
            password,
        });
        const userInfo = await createUserInfo({
            user_id: user.id,
            first_name,
            last_name,
            display_name,
        });
        log(
            "info",
            "userController.postUser",
            `User ${user.id} created`,
            "",
            req.ip
        );
        res.status(201).json({ user, userInfo });
    } catch (error) {
        log("error", "userController.postUser", error.message, "", req.ip);
        res.status(500).json({ error: error.message });
    }
};

export const postUserAuth = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        const token = jwt.sign(
            { id: user.id, roles: user.roles.split(",") },
            process.env.JWT_SECRET
        );
        log(
            "info",
            "userController.postUserAuth",
            `User ${user.id} authenticated`,
            user.id,
            req.ip
        );
        res.status(200).json({ token });
    } catch (error) {
        log("error", "userController.postUserAuth", error.message, "", req.ip);
        res.status(500).json({ error: error.message });
    }
};
