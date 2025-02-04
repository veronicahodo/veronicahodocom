import log from "../../tools/logger.js";
import jwt from "jsonwebtoken";
import {
    createUser,
    createUserInfo,
    authenticateUser,
    retrieveUserComplete,
    updateUserInfo,
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
        return res.status(201).json({ user, userInfo });
    } catch (error) {
        log("error", "userController.postUser", error.message, "", req.ip);
        returnres.status(500).json({ error: error.message });
    }
};

export const postUserAuth = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                display_name: user.display_name,
                pic: user.pic,
                roles: user.roles.split(","),
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            },
            process.env.JWT_SECRET
        );
        log(
            "info",
            "userController.postUserAuth",
            `User ${user.id} authenticated`,
            user.id,
            req.ip
        );
        return res.status(200).json({ token });
    } catch (error) {
        log("error", "userController.postUserAuth", error.message, "", req.ip);
        return res.status(500).json({ error: error.message });
    }
};

export const getMe = async (req, res) => {
    if (req.user === null)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const user = await retrieveUserComplete(req.user.id);
        log(
            "info",
            "userController.getMe",
            `User ${user.id} retrieved`,
            req.user.id,
            req.ip
        );
        return res.status(200).json({ user });
    } catch (error) {
        log("error", "userController.getMe", error.message, "", req.ip);
        return res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
    const { userId } = use.params;
    if (!userId) return res.status(400).json({ error: "Missing userId" });
    try {
        const user = await retrieveUserComplete(userId);
        log(
            "info",
            "userController.getUser",
            `User ${user.id} retrieved`,
            req.user !== null ? req.user.id : "",
            req.ip
        );
        return res.status(200).json({
            user: {
                id: user.id,
                display_name: user.display_name,
                roles: user.roles.split(","),
                pic: user.pic,
            },
        });
    } catch (error) {
        log("error", "userController.getUser", error.message, "", req.ip);
        return res.status(500).json({ error: error.message });
    }
};

export const putSettings = async (req, res) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const { first_name, last_name, display_name, theme } = req.body;
    try {
        const userInfo = await updateUserInfo(req.user.id, {
            first_name,
            last_name,
            display_name,
            theme,
        });
        log(
            "info",
            "userController.putSettings",
            `User ${req.user.id} settings updated`,
            req.user.id,
            req.ip
        );
        return res.status(200).json({ userInfo });
    } catch (error) {
        log("error", "userController.putSettings", error.message, "", req.ip);
        return res.status(500).json({ error: error.message });
    }
};
