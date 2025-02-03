import db from "../db.js";

const log = async (severity, unit, message, userId = "", ipAddress = "") => {
    let severityChar = "";
    switch (severity) {
        case "error":
            severityChar = "❌";
            break;
        case "warning":
            severityChar = "⚠️";
            break;
        case "info":
            severityChar = "🟦";
            break;
        case "debug":
            severityChar = "🪳";
            break;
        default:
            severityChar = "🟦";
    }
    const now = new Date();

    console.log(now.toISOString(), severityChar, "[" + unit + "]", message);
    await db("logs").insert({
        event_time: now.getTime(),
        severity,
        unit,
        message,
        user_id: userId,
        ip_address: ipAddress,
    });
};

export default log;
