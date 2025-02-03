import jwt from "jsonwebtoken";
import log from "../tools/logger.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        req.user = null;
        return next();
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        req.user = null;
        return next();
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (error) {
        req.user = null;
        log("error", "middleware.authenticate", error.message, "", req.ip);
        return next();
    }
};
